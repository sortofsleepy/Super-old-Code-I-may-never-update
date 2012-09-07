class System < ActionMailer::Base
  default :from => "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.system.index.subject
  #
    def contact_form(email)

       @sender = email[0]
    @website = email[1]
    @email = email[2]
    @message = email[3]

    @greeting = @sender+ "sent a message"

    mail :to => "rice9650@gmail.com",:subject=>@greeting
  end
end
