PsycheCMS::Application.routes.draw do


  get "email/index"

  #defining the index file
  root :to => "router#index"

  #resource routes
  resources :users
  resources :pages

  #explicit route to feed
  get "posts/postfeed"

  #route to rest of posts
  resources :posts
 
  #admin routes
  get "admin/index"
  get "admin/login"
  get "admin/dashboard"
  post "admin/check"
  get "admin/addpage"
  get "admin/addpost"
  get "admin/pages"
  get "admin/edit"

  #settings
  get "settings/index"

  #page router routes
  get "router/index"



  #error routes
  get "error/page_not_found"
  get "error/post_not_found"
  get "error/missing_template"
  get"error/no_content"
  get "error/security_violation"
  match '*a', :to=>'router#index'

 

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "router#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
