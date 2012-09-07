class AdminController < ApplicationController
  #definition for the admin index(likely gonna use for settings)
  def index
	  if session_check("index") == "pass"
       
     end
  end



 #definition for the login page
 def login

 end



 #handles functionality for the dashboard
 def settings
     if session_check("settings") == "pass"

  end


 end

####### post related functions ###############
def addpost
  if session_check("addPost") == "pass"
    @post = Post.new

    #look into the images directory for thumbnails
    @thumbs=  Dir.entries("public/images/thumbnails")
    @temp_hold = @thumbs.reverse.drop_while{|i| i=="."}
    @thumbnails = @temp_hold.drop_while{|s| s==".."}

    render :template=>'posts/new',:partial=>'postform'
  end
end

###### page related functions ################
def pages
 session_check
  
end

def addpage
 if session_check("addpage") == "pass"
  @page = Page.new
  @temp= Dir.entries("app/views/"+get_theme_name)
  @temp_hold = @temp.reverse.drop_while{|i| i=="."}
  @templates = @temp_hold.drop_while{|s| s==".."}

    render :template=>'pages/new',:layout=>"pageform"
  end
end




def edit
if session_check("edit") == "pass"
  if(params[:type] == "page")
    @title = "Edit page"
     @page = Page.find(params[:id])
     @temp= Dir.entries("app/views/"+get_theme_name+"/")
     @temp_hold = @temp.reverse.drop_while{|i| i=="."}
     @templates = @temp_hold.drop_while{|s| s==".."}
      render :template=>'/pages/edit',:layout=>"pageform"
  else if(params[:type] ==  "post")

      @title = "Edit post"
     @post = Post.find(params[:id])


       render :template=>'/posts/edit',:layout=>"postform",:partial=>"postedit"

  end
  end
end
 
end




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


   #method for post listing
   def posts

     @post = Post.all



   end



   #settings
   def settings

   redirect_to :controller=>'settings', :action=>"index"
   end
 

end
