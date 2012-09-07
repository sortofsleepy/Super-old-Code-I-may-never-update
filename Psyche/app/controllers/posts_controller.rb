class PostsController < ApplicationController

  def postfeed
    @posts = Post.all
     respond_to do |format|
      format.xml  { render :xml => @posts, :layout=>"app/views/posts/index.xml" }
       format.json  { render :json => @posts, :layout=>"app/views/posts/index.xml" }
    end
  end
  def index
    if access_check == "pass"

    @posts = Post.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts, :layout=>"app/views/posts/index.xml" }
       format.json  { render :json => @posts, :layout=>"app/views/posts/index.xml" }
    end
    end
  end


  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @post }
    end
  end


  def new
    if access_check == "pass"

    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @post }
    end
    end
  end

  def edit
    if access_check == "pass"

    @post = Post.find(params[:id])
    end
   end

  def create
  if access_check == "pass"
    @post = Post.new

    @post.title = params[:post][:title]
    @post.content = params[:post][:content]
    @post.excerpt = params[:post][:excerpt]
    @post.thumbnail = "/images/thumbnails/"+params[:post][:thumbnail]
    @post.categories = params[:post][:categories]

   
   

    respond_to do |format|
      if @post.save
       format.html { redirect_to(:controller=>"admin",:action=>"edit",:type=>"post",:id=>@post.id, :notice => 'Post was successfully updated.') }
         format.xml  { render :xml => @post, :status => :created, :location => @post }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end
  end

 
  def update
        if access_check == "pass"
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to(@post, :notice => 'Post was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end

  end
  def destroy
        if access_check == "pass"
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to(posts_url) }
      format.xml  { head :ok }
    end
  end
  end
end
