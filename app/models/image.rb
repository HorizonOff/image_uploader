class Image < ApplicationRecord
  mount_uploader :attachment, AttachmentUploader

  belongs_to :category
  belongs_to :main_image, class_name: "Image", optional: true

  has_many :sub_images, class_name: "Image", foreign_key: "main_image_id"

  validates_presence_of :attachment

  validate :check_sub_image_type, :check_sub_image_size, if: ->(obj) { obj.main_image_id.present? }

  default_scope -> { order(created_at: :desc) }

  def check_sub_image_type
    original_type = self.main_image.attachment.content_type

    if self.attachment.content_type != original_type
      errors.add(:base, "Uploaded image should have same type: #{ original_type.split("/").last }")
    end
  end

  def check_sub_image_size
    origin_ratio = (self.main_image.attachment.width.to_f / self.main_image.attachment.height.to_f).round(2)
    sub_ratio = (self.attachment.width.to_f / self.attachment.height.to_f).round(2)

    unless (sub_ratio * 100 / origin_ratio).between?(95, 105)
      errors.add(:base, "Uploaded image should have same ratio: #{ origin_ratio }")
    end
  end
end
