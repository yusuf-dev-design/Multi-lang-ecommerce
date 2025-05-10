class NotificationsController < ApplicationController
  def send_email
    email = params[:email]
    name = params[:name] || "Customer"

    OrderMailer.order_confirmation(email, name).deliver_now
    render json: { message: "Email sent" }, status: :ok
  end

  def send_sms
    phone = params[:phone]
    message = params[:message] || "Your order has been placed."

    SmsService.send_sms(phone, message)
    render json: { message: "SMS sent" }, status: :ok
  end
end