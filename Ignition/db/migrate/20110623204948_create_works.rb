class CreateWorks < ActiveRecord::Migration
  def self.up
    create_table :works do |t|
        #title of post
        t.string :title

        #post content
        t.text :content

        #categories: should be in comma,seperated string
        t.string :categories

        #post excerpt
        t.text :excerpt

        #hold code for related media: images, flash etc...
        t.text :related_media

        #client name
        t.string :client

        #media type
        t.string :media_type

        #tags: also should be in comma seperated string
        t.string :tags

        #path to thumbnail image
        t.string :thumbnail

        #permalink
        t.string :permalink
        
        #links
        t.string :links
        
        #author
        t.string :author

        #post date
        t.date :date


  
      t.timestamps
    end
  end

  def self.down
    drop_table :works
  end
end
