class SmsService
  def self.send_sms(phone, message)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    from = ENV['TWILIO_PHONE_NUMBER']

    client = Twilio::REST::Client.new(account_sid, auth_token)

    client.messages.create(
      from: from,
      to: phone,
      body: message
    )
  end
end