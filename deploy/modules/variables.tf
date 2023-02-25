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

variable external_data_fetcher_lambda_path {
  type        = string
  description = "Path to the external data fetcher lambda function code"
  default     = "lambdas/multi_fetcher.zip"
}

variable "versioned_data_types" {
  type = map
  description = "Map of versioned data types"

  validation {
    condition     = length(keys(var.versioned_data_types)) > 0
    error_message = "At least one versioned data type must be defined."
  }

  validation {
    condition = alltrue([
     for cols in var.versioned_data_types : alltrue([
      for col in cols : !contains(["id", "version"], cols)
     ])]) 
    error_message = "Columns 'id' and 'version' are reserved and cannot be used as column names."
   }
}

variable "external_data_fetchers" {
  type = map(object({
    sourceURL = string
    sourceType = string
    fieldMappings = map(string)
    xpathRowIterator = string
  }))

  validation {
    condition     = length(regexall("^(csv|json|google-sheets|html-xpath)$", var.external_data_fetchers.sourceType)) > 0
    error_message = "ERROR: Valid types are csv, json, google-sheets and html-xpath"
  }

  validation {
    condition     = length(regexall("^(http|https)://", var.external_data_fetchers.sourceURL)) > 0
    error_message = "ERROR: Valid URL protocols are http and https"
  }
}