# Issue: https://github.com/rails/rails/pull/3789
require 'rack/utils'

module Rack
  module Utils
    def normalize_params_with_sanitation(params, name, v = nil)
      if "ruby".encoding_aware? && name
        ActionDispatch::Encoder.encode_to_internal(name)
      end
      normalize_params_without_sanitation(params, name, v)
    end
    alias_method_chain :normalize_params, :sanitation
    module_function :normalize_params, :normalize_params_without_sanitation
  end
end
