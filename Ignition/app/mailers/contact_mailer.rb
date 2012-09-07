class ContactMailer < ActionMailer::Base
  default :from => "Ignition CMS administration"
  
  
   def contact_form(email)

       @sender = email[0]
       @website = email[1]
       @email = email[2]
       @message = email[3]

       @greeting = @sender+ " sent a message"

       mail :to => "rice9650@gmail.com",:subject=>@greeting
  end
end
