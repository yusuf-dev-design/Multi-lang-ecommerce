require_relative 'boot'

require "rails"
%w(
  active_record
  action_controller
  action_view
  action_mailer
  sprockets
).each do |framework|
  require "#{framework}/railtie"
end

Bundler.require(*Rails.groups)

module MyApp
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true
  end
end