resource "aws_dynamodb_table" "versioned_data" {
    for_each = var.versioned_data_types
    name           = each.key
    billing_mode   = "PROVISIONED"
    read_capacity  = 20
    write_capacity = 20
    hash_key       = "id"
    range_key      = "version"

    attribute {
        name = "id"
        type = "S"
    }

    attribute {
        name = "version"
        type = "S"
    }
}