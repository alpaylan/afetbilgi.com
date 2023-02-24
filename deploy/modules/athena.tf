resource "aws_athena_database" "s3_access_logs" {
    name = var.s3_access_logs_db_name
    bucket = aws_s3_bucket.logs.id
}

resource "aws_athena_named_query" "create_prod_data_bucket_access_logs_table" {
    name = "Create prod data bucket access logs table"
    database = aws_athena_database.s3_access_logs.name
    query = <<EOF
CREATE EXTERNAL TABLE `${aws_athena_database.s3_access_logs.name}.${aws_s3_bucket.public_data.bucket}`(
  `bucketowner` STRING, 
  `bucket_name` STRING, 
  `requestdatetime` STRING, 
  `remoteip` STRING, 
  `requester` STRING, 
  `requestid` STRING, 
  `operation` STRING, 
  `key` STRING, 
  `request_uri` STRING, 
  `httpstatus` STRING, 
  `errorcode` STRING, 
  `bytessent` BIGINT, 
  `objectsize` BIGINT, 
  `totaltime` STRING, 
  `turnaroundtime` STRING, 
  `referrer` STRING, 
  `useragent` STRING, 
  `versionid` STRING, 
  `hostid` STRING, 
  `sigv` STRING, 
  `ciphersuite` STRING, 
  `authtype` STRING, 
  `endpoint` STRING, 
  `tlsversion` STRING,
  `accesspointarn` STRING,
  `aclrequired` STRING)
ROW FORMAT SERDE 
  'org.apache.hadoop.hive.serde2.RegexSerDe' 
WITH SERDEPROPERTIES ( 
  'input.regex'='([^ ]*) ([^ ]*) \\[(.*?)\\] ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) (\"[^\"]*\"|-) (-|[0-9]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) (\"[^\"]*\"|-) ([^ ]*)(?: ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*))?.*$') 
STORED AS INPUTFORMAT 
  'org.apache.hadoop.mapred.TextInputFormat' 
OUTPUTFORMAT 
  'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION
  '${aws_s3_bucket_logging.public_data.target_bucket}/${aws_s3_bucket_logging.public_data.target_prefix}'
EOF
}

resource "aws_athena_named_query" "prod_data_bucket_daily_top_requests_per_ip_detailed" {
    name = "Prod data bucket daily top requests per IP detailed"
    database = aws_athena_database.s3_access_logs.name
    query = <<EOF
select
    remoteip,
    count(remoteip) as requests,
    date_parse(min(requestdatetime), '%d/%b/%Y:%T +0000') as from_ts,
    date_parse(max(requestdatetime), '%d/%b/%Y:%T +0000') as to_ts
from ${aws_s3_bucket.public_data.bucket}
where
    date_parse(requestdatetime, '%d/%b/%Y:%T +0000') >= date_add('day', -1, current_timestamp)
    AND date_parse(requestdatetime, '%d/%b/%Y:%T +0000') < current_timestamp
group by remoteip
order by requests desc
EOF
}

resource "aws_athena_named_query" "prod_data_bucket_daily_operations_count" {
    name = "Prod data bucket daily operations count"
    database = aws_athena_database.s3_access_logs.name
    query = <<EOF
select
    operation,
    count(operation) as requests,
    date_parse(min(requestdatetime), '%d/%b/%Y:%T +0000') as from_ts,
    date_parse(max(requestdatetime), '%d/%b/%Y:%T +0000') as to_ts
from ${aws_s3_bucket.public_data.bucket}
where
    date_parse(requestdatetime, '%d/%b/%Y:%T +0000') >= date_add('day', -1, current_timestamp)
    AND date_parse(requestdatetime, '%d/%b/%Y:%T +0000') < current_timestamp
group by operation
order by requests desc
EOF
}

resource "aws_athena_named_query" "prod_data_bucket_hourly_operations_count_with_10m_window" {
    name = "Prod data bucket hourly operations count with 10m window"
    database = aws_athena_database.s3_access_logs.name
    query = <<EOF
select
    operation,
    count(operation) as requests,
    date_parse(min(requestdatetime), '%d/%b/%Y:%T +0000') as from_ts,
    date_parse(max(requestdatetime), '%d/%b/%Y:%T +0000') as to_ts
from ${aws_s3_bucket.public_data.bucket}
where
    date_parse(requestdatetime, '%d/%b/%Y:%T +0000') >= date_add('minute', -70, current_timestamp)
    AND date_parse(requestdatetime, '%d/%b/%Y:%T +0000') < date_add('minute', -10, current_timestamp)
group by operation
order by requests desc
EOF
}