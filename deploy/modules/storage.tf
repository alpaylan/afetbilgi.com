resource "aws_s3_bucket" "public_data" {
    bucket = var.prod_data_bucket_name
}

resource "aws_s3_bucket" "logs" {
    bucket = var.log_bucket_name
}

resource "aws_s3_bucket_logging" "public_data" {
  bucket = aws_s3_bucket.public_data.id

  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "${aws_s3_bucket.public_data.bucket}/"
}

resource "aws_s3_bucket_cors_configuration" "public_data" {
  bucket = aws_s3_bucket.public_data.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = []
  }
}

resource "aws_s3_bucket_policy" "allow_all_public_access" {
    bucket = aws_s3_bucket.public_data.id
    policy = jsonencode(
        {
            Statement = [
                {
                    Action    = "s3:GetObject"
                    Effect    = "Allow"
                    Principal = "*"
                    Resource  = "arn:aws:s3:::cdn.afetbilgi.com/*"
                },
            ]
            Version   = "2012-10-17"
        }
    )
}

resource "aws_s3_bucket_server_side_encryption_configuration" "public_data" {
    bucket = aws_s3_bucket.public_data.id

    rule {
        bucket_key_enabled = true

        apply_server_side_encryption_by_default {
            sse_algorithm = "AES256"
        }
    }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
    bucket = aws_s3_bucket.logs.id

    rule {
        bucket_key_enabled = true

        apply_server_side_encryption_by_default {
            sse_algorithm = "AES256"
        }
    }
}