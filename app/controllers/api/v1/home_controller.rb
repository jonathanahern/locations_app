class Api::V1::HomeController < ShopifyApp::AuthenticatedController
  def index

        if !ShopifyAPI::ScriptTag.where(src:" #{ request.base_url}/test.js").present?
          ShopifyAPI::ScriptTag.create(:event => "onload" , :src =>" #{request.base_url}/test.js" )
        end
        
  end
end
