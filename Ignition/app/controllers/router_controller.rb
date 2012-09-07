class RouterController < ApplicationController

  def index

    #grab the url
    @url = params[:a]

    if @url == nil
      puts 'loading index'

      load_content('index')
    else
      puts 'loading other content'
      load_content(@url)
    end
  

  end



########### UTILITY FUNCTIONS ####################

  def load_content(page)
      #grab the template
      @template = get_theme(page)



    if(page == "index")
      puts 'loading index page'
      
      #grab the index page
      @page = Page.where(:title=>"index").first


    
      
      #assign content to variable
      @content = @page.content

      #get the page title
      @title = @page.title


    else if(page != "index")
        
        #find the # of segments in the url
        # this will determine how we search
        @segments = page.split("/")



        #if we only have one segment, we want a page
        if @segments.size <2
          puts "loading page:#{@segments[0]}"
          @page = Page.where(:title=>@segments[0]).first

          #assign content to variable
          @content = @page.content

          #get the page title
          @title = @page.title
        end

        #if we have more than one segment, we want a post
        #will write later as we're using js based loading.

        #if segment 1 has the word admin
        #we want the admin page
        if @segments[0] == "admin"
          
       
          
        end


    end

    end #end outer if


    #render the template
      if @template != nil
        render :layout=>@template
      else
        redirect_to :controller=>"error", :action=>"no_template"
      end

  end#end function



end
