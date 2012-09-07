class ApplicationController < ActionController::Base
  protect_from_forgery

=begin
  General session check
=end
def session_check(refer)
   if session[:user] == nil
      redirect_to :controller=>"admin", :action=>"login",:refer=>refer
      flash[:notice] = "You haven't logged in!, please login first"
   else
   	return "pass"
   end
end

def access_check
     if session[:user] == nil
      redirect_to :controller=>"error", :action=>"no_content"
 
   else
   	return "pass"
   end
end

=begin
  Session check if you want to render
  a layout if the test passes
=end
  def session_check_render(layout=null)
    if session[:user] == nil
      redirect_to :action=>"login"
      flash[:notice] = "You haven't logged in!, please login first"
    else

       render :layout=>layout

    end
  end




=begin
Session check if you want to instead
redirect to another location instead
of rendering a layout
=end
def session_check_redirect(page=null)
    if session[:user] == nil
      redirect_to :action=>"login"
      flash[:notice] = "You haven't logged in!, please login first"
    else

       render :layout=>page

    end
  end


=begin
Determines how to render a particular
page.

First looks for the current theme,
then looks at the current page and see
what template to use.

Returns the path to the template file
=end

  def get_theme(page)
    #grab the theme folder
    @theme = Settings.where(:setting=>"theme").first

    #grab the current action
    @action = action_name

    #grab the template
    @template_name = Page.where(:title=>page).first.template

    if File.exist?('app/views/layouts/themes/'+@theme.value+'/'+@template_name)
      puts "template exists"
       return 'layouts/themes/'+@theme.value+'/'+@template_name
    else
      puts "template doens't exist"+'layouts/themes/'+@theme.value+'/'+@template_name
     # redirect_to :controller=>"error",:action=>"missing_template"
    end

  end

  #same thing as get_theme, only it just gets the theme name instead of outputting full path
  def get_theme_name
     #grab the theme folder
    @theme = Settings.where(:setting=>"theme").first
    return 'layouts/themes/'+@theme.value+'/'
  end




################## Stylesheet expansions ###################
    ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :defaults => ["jgrowl"]

  




end
