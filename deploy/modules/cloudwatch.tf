resource "aws_cloudwatch_event_rule" "every_day" {
  name = "daily"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_rule" "every_10m" {
  name = "every_10m"
  schedule_expression = "rate(10 minutes)"
}