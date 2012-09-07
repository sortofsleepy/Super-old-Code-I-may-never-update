class EmailController < ApplicationController

  #main function handling contact form
  def index

    @sender = params[:name]
    @website = params[:website]
    @email = params[:email]
    @message = params[:message]
    @referer = params[:referer]
    @hash = Array.[](@sender,@website,@email,@message)

    #quick check to make sure no one is trying to spam me.
    #if they are, don't send email
    if self.script_check(@hash) == false

  
  if System.contact_form(@hash).deliver
    puts @referer;
    if @referer.downcase == "TheUserAgent"
    flash[:message] = "Message Sent!"
        redirect_to "/"
    else
      flash[:message] = "Message Sent!"
    redirect_to "/"+@referer
    end

  end


    else
      redirect_to :controller=>"error", :action=>"security_violation"
    end
  end

  #validation methods
  #just gonna check for a script or link tag, otherwise the message is likely safe.
  def script_check(hash)
    hash.each do |s|
      if s.include?("<script>")||s.include?("<a>")

        #redirect_to :controller=>"error", :action=>"security_violation"
        return true
      end
    end

    return false

  end


end
