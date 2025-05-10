class OrderMailer < ActionMailer::Base
  default from: 'no-reply@example.com'

  def order_confirmation(email, name)
    @name = name
    mail(to: email, subject: 'Order Confirmation')
  end
end