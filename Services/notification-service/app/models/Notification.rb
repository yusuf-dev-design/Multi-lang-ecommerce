class Notification < ActiveRecord::Base
  validates :recipient, :message, presence: true
end