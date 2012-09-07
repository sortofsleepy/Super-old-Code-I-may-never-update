class RouterController < ApplicationController
  protect_from_forgery


=begin
  Extention of the main routing system.
  reads the URL and redirects/renders the requested content


if(params[:design] != nil)
       load_content("index")
     else if params[:design] == nil
        redirect_to ("http://www.lightplayinteractive.com/site");
     end
=end
	def index

			     #store the url entered
			     @url = params[:a]

			     #get the permalink settings from the database
			     @post_permalink_settings = Settings.where(:setting=>"post-permalink").first.value

       

			     #if there aren't any segments, we want the home page
			     if @url == nil
             #session[:live] == true
             puts "load index"
			      load_content('index')

			     #otherwise if the url contains the word "admin", handle the call
			     else if @url.include?("admin")
			            #handle the admin calls
			            @pages = @url.split("/")


			            @sub = @pages[1]

			        if @sub == ""
			          redirect_to :controller=>"admin"
			        else
			          redirect_to :controller=>"admin", :action=>@sub
			        end
           else if @url.include?("email")
            redirect_to :controller=>"email"


			     #if the url is not empty
			     else if @url !=  ""


			          #first we check to make sure this is a valid page
			          #by deconstructing the url and seeing if there's a match with
			          #any segment to a page name
			          @pages = @url.split("/")

			          @pages.each do|s|

			            @is_page = Page.where(:title=>s).first

			          end

			          if(@is_page != nil)
			          puts "page found"

			            #parent = controller, sub = action
			            @parent = @pages[0]
			            @sub = @pages[1]

			            #puts @parent

			            if @sub == nil

			                #if an action wasn't called, load the parent content
			                load_content(@parent)
			            else

			              #first load the sub page as object
			              @sub_obj = Page.where(:title=>@sub).first


			              if(@sub_obj != nil)

			                @sub_parent = @sub_obj.parent


			              #check for a match
			              if @sub_parent != nil && @parent == @sub_parent
			                load_content(@sub)
			              else
			                redirect_to :controller=>"error", :action=>"page_not_found"
			              end

			              else
			                redirect_to :controller=>"error", :action=>"page_not_found"
			              end

			            end


			          else if @is_page == nil
			              puts "is post"
			            #if a valid page isn't found, now we run a post check.
			            @settings = Settings.where(:setting=>"post-permalink").first.value

			            @post = Post.where(:permalink =>"/"+@url).first

			            if(@post != nil)
			                #posts are automatically rendered with a specific template.
			                @template = get_theme_name()+"single.html.erb"
			                @content = @post.content
                      
			              render :layout=>@template;
			            else if @post == nil
			              redirect_to(:controller=>"error",:action=>"no_content")
			            end

			          end
			     end



			     end

			     end
			     end
           end

			     end #end post check
			  end#end function
  end
  
	def mail
  render :text=>"BLAH"
	end

  def load_content(page)
    if(page == "index")
      @page = Page.where(:title=>"index").first
      @template = get_theme("index")
      @content = @page.content
      
      @title = "Lightplay Interactive"

      if @template != nil
        render :layout=>@template
      else
        redirect_to :controller=>"error", :action=>"no_template"
      end
    else if(page != "index")
      @page = Page.where(:title=>page).first


      #if the page isn't found, redirect to appropriate error page
      if @page == nil
        redirect_to :controller=>"error",:action=>"page_not_found"
        puts "Template"+@template+"not found"
      else
        @template = get_theme(page)
     
        @content = @page.content
        @title = @page.title
        render :layout=>@template
      end


  end
  end


  end
