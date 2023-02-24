variable "prod_data_bucket_name" {
  type        = string
  description = "Name of the S3 bucket for production data"
  default     = "sazak-prod-data"
}

variable "log_bucket_name" {
  type        = string
  description = "Name of the S3 bucket for logging"
  default     = "sazak-log-bucket"
}

variable "s3_access_logs_db_name" {
  type        = string
  description = "Name of the Athena database for S3 access logs"
  default     = "sazak_s3_access_logs"
}
