resource "aws_s3_object" "versioned_data_schema" {
    bucket = aws_s3_bucket.public_data.id
    key = "schema.json"
    content = jsonencode(var.versioned_data_types)
}