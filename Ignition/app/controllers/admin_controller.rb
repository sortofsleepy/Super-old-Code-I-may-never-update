class AdminController < ApplicationController

  #administration index
  def index

  end


  #writing posts
  def writepost

  end


  #creating pages
  def createpage

  end


############## ADMIN UTILITY FUNCTIONS #######################

=begin
  Checks to see if the user in the 
  admin section has been authenticated.
=end
   def check

    #attempt to get the entered user
    @user = User.where(:username=>params[:username],:password=>Digest::MD5.hexdigest(params[:password]))
    @refer = params[:refer]

     puts "referer is:"+@refer
    #if the record is found
    if @user.exists?

         #take the first record found
         @user.find(1)

            #create a new instance of the record
            @user_object = @user.new

            #get username and password.
            @username = @user_object.username
            @password = @user_object.password

            #if we have a match, handle the redirect to the appropriate place.
            if @password = Digest::MD5.hexdigest(params[:password])

                #if there is a referer, refer back to that
                if(params[:refer] == "")
                 
                    redirect_to :action=>"dashboard"
                  session[:user] = @username;

                else
                   redirect_to :action=>params[:refer]
                  session[:user] = @username;
                end
            
            end


    #if the password was wrong, then redirect back to login
    else
      redirect_to :controller=>"admin",:action=>"login"
      flash[:notice] = "Your password was incorrect. Please try again"
    end
  end


end
