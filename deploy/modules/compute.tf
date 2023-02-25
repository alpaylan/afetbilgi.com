resource "aws_lambda_function" "external_data_fetchers" {
  for_each = var.external_data_fetchers
  function_name = each.key
  role = aws_iam_role.lambda.arn
  handler = "multi_fetcher"
  runtime = "python3.8"
  filename = var.external_data_fetcher_lambda_path
  source_code_hash = filebase64sha256(var.external_data_fetcher_lambda_path)
  timeout = 300

  environment {
    variables = {
      "DATA_TYPE" = each.key
      "DATA_BUCKET" = aws_s3_bucket.public_data.id
      "DATA_TABLE" = aws_dynamodb_table.versioned_data[each.key].name
      "DATA_FETCHER_CONFIG" = jsonencode(each.value)
    }
  }
}

// Allow CloudWatch to invoke our function
resource "aws_lambda_permission" "allow_cloudwatch_to_invoke" {
  function_name = aws_lambda_function.external_data_fetchers.function_name
  statement_id = "CloudWatchInvoke"
  action = "lambda:InvokeFunction"

  source_arn = aws_cloudwatch_event_rule.every_day.arn
  principal = "events.amazonaws.com"
}

// Set the action to perform when the event is triggered
resource "aws_cloudwatch_event_target" "invoke_lambda" {
  rule = aws_cloudwatch_event_rule.every_10m.name
  arn = aws_lambda_function.external_data_fetchers.arn
}