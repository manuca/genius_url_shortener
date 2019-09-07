class Url < ApplicationRecord
  # Associations
  has_many :visits

  # Callbacks
  before_create :assign_shortcode

  # Validations
  validates :url, presence: true, url: true

  def self.generate!(url_params)
    begin
      retries ||= 0
      Url.find_or_create_by(url_params)
    rescue ActiveRecord::RecordNotUnique
      if retries < 3
        retries += 1
        retry
      else
        Rails.logger.warn(
          "Retried generating shortcode #{retries} times without success"
        )
      end
    end
  end

  def assign_shortcode
    self.shortcode = SecureRandom.base36(5)
  end
end
