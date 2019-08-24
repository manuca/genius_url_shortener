class Url < ApplicationRecord
  # Callbacks
  before_create :assign_shortcode

  # Validations
  validates :url, presence: true, url: true

  def assign_shortcode
    self.shortcode = SecureRandom.base36(5)
  end
end
