class MailController < ApplicationController


  #main function handling contact form
   def index

     @sender = params[:name]
     @website = params[:website]
     @email = params[:email]
     @message = params[:comment]
     
     #need to see if we redirect back to blog
     @blog = params[:wp_refer]
     
     @referer = '/#/contact'
     @hash = Array.[](@sender,@website,@email,@message)
     
     if check_script(@hash) == true
        if ContactMailer.contact_form(@hash).deliver
            flash[:mail_sent] = "Message Sent!" 
            if(@blog != "wp")
              redirect_to "/#/contact"
            else
              redirect_to "http://labs.theuseragent.com/#/contact"
            end
         end
        
     else
         redirect_to :controller=>"error", :action=>"email_bad"
        
       
     end
     


   end


   def check_script(hash)
    hash.each do |s|
      if s.include?("<script>")||s.include?("<a>")
       
        return false
      else
        return true
      end
    end
   
   end
end
