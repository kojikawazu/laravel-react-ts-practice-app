# ---------------------------------------------
# S3 - バケット
# ---------------------------------------------
resource "aws_s3_bucket" "blog_image_bucket" {
  bucket = "${var.project}-${var.environment}-bucket"

  tags = {
    Name    = "${var.project}-${var.environment}-bucket"
    Project = var.project
    Env     = var.environment
  }
}

# ---------------------------------------------
# S3 - バージョニングの設定
# ---------------------------------------------
resource "aws_s3_bucket_versioning" "blog_image_bucket_versioning" {
  bucket = aws_s3_bucket.blog_image_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ---------------------------------------------
# S3 - バケットポリシーの設定
# ---------------------------------------------
resource "aws_s3_bucket_policy" "blog_image_bucket_policy" {
  bucket = aws_s3_bucket.blog_image_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "s3:GetObject"
        Effect = "Allow"
        Principal = {
          "AWS" : var.s3_access_iam_arn
        }
        Resource = "arn:aws:s3:::${aws_s3_bucket.blog_image_bucket.bucket}/*"
      }
    ]
  })
}

