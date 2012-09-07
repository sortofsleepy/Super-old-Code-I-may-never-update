class Post < ActiveRecord::Base


  #gets the latest 3 posts
  def self.latest(limit=nil)
    if limit == nil
      @latest = Post.order("id DESC").limit(3)
      return @latest
    else
    @latest = Post.limit(limit).order("id DESC")
    return @latest
    end
  end

  #creates the permalinks
  def form_permalink()

     #get the permalink setting
    @settings = Settings.where(:setting=>"post-permalink").first.value

     #lets go through the possible combos of permalinks
    if @settings == "categories/title"
      @title= params[:post][:title]
       @post.permalink = "/"+params[:post][:categories]+"/"+@title.sub(" ","-")
    else if @settings == "title"
        @post.permalink = params[:post][:title]
    end
  end
  end

  def render_field(fieldName)
    
  end
end
