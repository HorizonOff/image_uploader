class Category < ApplicationRecord
  has_many :images

  validates :title, presence: { message: 'Title is required' },
                    uniqueness: { message: 'Current title already exist' }
end
