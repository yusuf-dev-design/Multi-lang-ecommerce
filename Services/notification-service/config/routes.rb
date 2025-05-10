Rails.application.routes.draw do
  post '/notify/email', to: 'notifications#send_email'
  post '/notify/sms', to: 'notifications#send_sms'
end