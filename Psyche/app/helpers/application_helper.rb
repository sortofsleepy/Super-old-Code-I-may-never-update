module ApplicationHelper

def checkMessageSent
  if flash[:message] != nil
    return raw "<script>
    $(document).ready(function(){
      $.jGrowl(\""+flash[:message]+"\");
});

</script>"
  else
    puts "No message sent"
  end
end

  ###### POSTS RETRIVAL FUNCTION ###################

def tester
 return raw stylesheet_link_tag "test"
end


def latest_posts
     
    @latest = Post.latest
    @latest.each do|s|
      @title = s.title
      if s.excerpt != nil
        @excerpt = s.excerpt
      end
    end
end


######### RENDER JGROWL MESSAGE ###################

def message(message,sticky)
  return raw "<script type=\"text/javascript\">
   $.jGrowl(\"#{message}\",{sticky:#{sticky});
  </script>"
end

######### BROWSER DETECT ##########################
#this detects based on technology, not browser or version
def browser_detect
    @agent = request.env['HTTP_USER_AGENT']


    #if we're using firefox
    if @agent.include?("Gecko")

      return "gecko"
    
    #otherwise if we're using Chrome, Safari, Rockmelt
    else if @agent.include?("AppleWebKit")

      return "webkit"
    
    #or mobile?
    else if((@agent.include?("iPad"))||(@agent.include?("iPhone")))

      return "mobile"

    end
    end
    end





end

############## UTILITY FUNCTIONS ###########################
  #resets a previously set float style
  def clear
    return raw "<div style=\"clear:both\"></div>"
  end


  #renders a spacer to add a bit of extra padding.
  def spacer(padding)
    return raw "<div style=\"padding-top:"+padding+"px; padding-bottom:"+padding+"px\"></div>"

  end

  def render_common(item)
    @current_theme = get_theme_name
    render :partial=>'layouts/themes/'+@current_theme+'/'+item+'.html.erb'
  end

  #alternate to rails css tag. Difference is, this supports mobile detection
  def css(page)
    if mobile_check
         return raw "<link rel=\"stylesheet\" href=\"/stylesheets/mobile/"+page+".css\"/>"
    else
          #grab the theme folder
      @theme = Settings.where(:setting=>"theme").first

      return raw "<link rel=\"stylesheet\" href=\"/stylesheets/themes/"+@theme.value+"/"+page+".css\"/>"

    end
  end

  #render content
  def render_asset(path)
    return raw "public/"+path
  end


  #loads the menu with the name thats passed in
  def load_menu(name)
    @menustring = Menu.where(:name=>name).first
    @menu = @menustring.pages.split(',')
    return @menu
  end

  #check to see if we're using a mobile device
  def mobile_check

    @useragent = request.env['HTTP_USER_AGENT']
    @devices = ["iPad","iPhone"]

    @devices.each do |s|
    if @useragent.include?(s)

        return true

      else

        return false

      end
    end


  end


#load ui css defaults
def ui_css(files=nil)
   return raw "<link rel=\"stylesheet\" href=\"/stylesheets/themes/ui-lightness/jquery.ui.all.css\"/><br/>"
    return raw "<link rel=\"stylesheet\" href=\"/stylesheets/themes/ui-lightness/jquery.ui.base.css\"/><br/>"
end



=begin
This replaces the yield function for themes.
This is done since there is a bit of trickery that
needs to happen so that the user doesn't need
to make their own controllers, route paths etc...
=end
def render_content(content)
  if content != nil
    render :inline => content
  end
end
#
#same thing as get_theme, only it just gets the theme name instead of outputting full path
  def get_theme_name
     #grab the theme folder
    @theme = Settings.where(:setting=>"theme").first.value
    return @theme
  end

 def get_user
     return session[:user]
   end



 def analytics(account = nil)
   if account == nil
     accountNumber = "UA-21617606-2"
   else
     accountNumber = account
   end

   return raw "
<script type=\"text/javascript\">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', '"+accountNumber+"']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>"
 end



 #meta tag helpers
 def meta(name,content)
  return raw "<meta name=\"#{name}\" content=\"#{content}\"/>"
 end



#gets the current page's title
#returns the site name if on the home page
def get_title()
 
  current_page = request.env["PATH_INFO"]
  
 
    title = current_page.sub('/',' ')

  
  return title.capitalize
end




end #end module
