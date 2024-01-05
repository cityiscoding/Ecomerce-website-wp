<?php
// cityiscoding
// cấu hình bắc buộc số điện thoại đúng quy định billing_phone
 // SETTINGS: The countries codes (2 capital letters) in the array
function defined_countries_for_phone_field() {
    return array('VN'); // Sửa lại để chỉ có Việt Nam
}

// Remove "(optional)" from required "Billing phone" field
add_filter('woocommerce_form_field', 'remove_checkout_optional_fields_label', 10, 4);
function remove_checkout_optional_fields_label($field, $key, $args, $value) {
    // Get the defined countries codes
    $countries = defined_countries_for_phone_field();

    // Get Customer shipping country
    $shipping_country = WC()->customer->get_shipping_country();

    // Only on checkout page and My account > Edit address for billing phone field
    if ('billing_phone' === $key && ((is_wc_endpoint_url('edit-address') && !in_array($shipping_country, $countries)) || is_checkout())) {
        $optional = '&nbsp;<span class="optional">(' . esc_html__('optional', 'woocommerce') . ')</span>';
        $field = str_replace($optional, '', $field);
    }
    return $field;
}

// Make the billing phone field required
add_filter('woocommerce_billing_fields', 'filter_billing_phone_field', 10, 1);
function filter_billing_phone_field($fields) {
    // Get the defined countries codes
    $countries = defined_countries_for_phone_field();

    // Get Customer shipping country
    $shipping_country = WC()->customer->get_shipping_country();

    // Only on checkout page and My account > Edit address
    if ((is_wc_endpoint_url('edit-address') && !in_array($shipping_country, $countries)) || is_checkout()) {
        $fields['billing_phone']['required'] = true;
    }

    return $fields;
}

// Real-time shipping country selection actions
add_action('woocommerce_after_order_notes', 'custom_checkout_scripts_and_fields', 10, 1);
function custom_checkout_scripts_and_fields($checkout) {
    $required = esc_attr__('required', 'woocommerce');

    // Get the defined countries codes
    $countries = defined_countries_for_phone_field();

    // Hidden field for the phone number validation
    echo '<input type="hidden"  name="billing_phone_check" id="billing_phone_check" value="0">';
    $countries_str = "'" . implode("', '", $countries) . "'"; // Formatting countries for jQuery
    ?>
<script type="text/javascript">
(function($) {
  var required = '<abbr class="required" title="<?php echo $required; ?>"></abbr>',
    countries = [<?php echo $countries_str; ?>],
    location = $('#shipping_country option:selected').val(),
    phoneCheck = 'input#billing_phone_check',
    phoneField = '#billing_phone_field';

  function actionRequire(actionToDo = 'yes', selector = '') {
    if (actionToDo == 'yes') {
      $(selector).addClass("validate-required");
      $(selector + ' label').append(required);
    } else {
      $(selector).removeClass("validate-required");
      $(selector + ' label > .required').remove();
    }
    $(selector).removeClass("woocommerce-validated");
    $(selector).removeClass("woocommerce-invalid woocommerce-invalid-required-field");
  }

  // Default value Once DOM is loaded (with a 300 ms delay)
  setTimeout(function() {
    actionRequire('yes', phoneField);
    if ($.inArray(location, countries) >= 0 && $(phoneCheck).val() == '0') {
      actionRequire('yes', phoneField);
      $(phoneCheck).val('1');
    }
  }, 300);

  // Live value
  $('form.checkout').on('change', '#shipping_country', function() {
    var location = $('#shipping_country option:selected').val();
    if ($.inArray(location, countries) >= 0 && $(phoneCheck).val() == 0) {
      actionRequire('yes', phoneField);
      $(phoneCheck).val('1');
    } else if ($(phoneCheck).val() == 1) {
      actionRequire('no', phoneField);
      $(phoneCheck).val('0');
    }
  });
})(jQuery);
</script>
<?php
}

// Phone number validation, when the field is required
add_action('woocommerce_checkout_process', 'billing_phone_field_process');
function billing_phone_field_process() {
    $billing_phone = wc_clean($_POST['billing_phone']);

    // Check if set, if it's not set add an error.
    if (empty($billing_phone) || !preg_match('/^0\d{9}$/', $billing_phone)) {
        wc_add_notice(__('Bạn vui lòng nhập đúng số điện thoại nhận hàng. Ví dụ: 0857332962'), 'error');
    }
}
// custom
add_filter('woocommerce_checkout_fields', 'dms_custom_override_checkout_fields', 9999999);
function dms_custom_override_checkout_fields($fields)
{
//billing
$fields['billing']['billing_country']['priority'] = 1;
$fields['billing']['billing_first_name'] = array(
'label' => __('Họ và tên'),
'placeholder' => _x('Ví dụ: Trần Thành Phố', 'placeholder'),
'required' => true,
'class' => array('form-row-wide'),
'clear' => true,
'priority' => 10
);
$fields['billing']['billing_phone']['priority'] = 20;
$fields['billing']['billing_email']['priority'] = 20;
$fields['billing']['billing_email']['placeholder'] = _x('tranthanhpho.dev@gmail.com','placeholder');
unset($fields['billing']['billing_last_name']);
unset($fields['billing']['billing_company']);
unset($fields['billing']['billing_postcode']);
unset($fields['billing']['billing_state']);
unset($fields['billing']['billing_address_2']);
//
$fields['billing']['billing_phone']['placeholder'] = _x('Số điện thoại nhận hàng', 'placeholder');
$fields['billing']['billing_address_1']['class'] = array('form-row-wide');
$fields['billing']['billing_address_1']['priority'] = 50;
$fields['billing']['billing_address_1']['label'] = _x('Địa chỉ cụ thể', 'placeholder');
$fields['billing']['billing_address_1']['placeholder'] = _x('Ví dụ: Ấp 3 Xã An Xuyên Thành Phố Cà Mau', 'placeholder');
$fields['billing']['billing_city']['priority'] = 120;
$fields['billing']['billing_district']['priority'] = 120;
$fields['billing']['billing_ward']['priority'] = 120;


//shipping
$fields['shipping']['shipping_first_name'] = array(
'label' => __('Họ và tên'),
'placeholder' => _x('Họ và tên', 'placeholder'),
'required' => true,
'class' => array('form-row-first'),
'clear' => true,
'priority' => 10
);

$fields['shipping']['shipping_address_1']['class'] = array('form-row-wide');
$fields['shipping']['shipping_phone'] = array(
'label' => __('Số điện thoại'),
'placeholder' => _x('Số điện thoại', 'placeholder'),
'required' => true,
'class' => array('form-row-last'),
'clear' => true,
'priority' => 20
);
uasort($fields['billing'], 'dms_sort_fields_by_order');
uasort($fields['shipping'], 'dms_sort_fields_by_order');
return $fields;
}
function ts_hide_ship_to_different_address_checkbox() {
if (is_checkout()) {
echo '<style>
#ship-to-different-address label {
  display: none;
}
</style>';
}
}
add_action('wp_head', 'ts_hide_ship_to_different_address_checkbox');
add_filter( 'woocommerce_enable_order_notes_field', '__return_false', 9999 );

// Chỉnh sửa trường billing_email để chỉ có thể xem (read-only)
// Ẩn checkbox "Ship to a different address" trên trang thanh toán
add_action('wp_head', 'ts_hide_ship_to_different_address_checkbox');
add_filter('woocommerce_enable_order_notes_field', '__return_false', 9999);

// Chỉnh sửa trường billing_email để chỉ có thể xem (read-only)
function custom_billing_email_readonly_script() {
    // Chỉ thêm mã JavaScript nếu ở trang Checkout của WooCommerce
    if (is_checkout()) {
        ?>
<script>
jQuery(document).ready(function($) {
  // Chọn ô nhập liệu theo ID
  var billingEmailInput = $('#billing_email');

  // Kiểm tra xem ô nhập liệu có tồn tại không
  if (billingEmailInput.length) {
    // Đặt thuộc tính readonly cho ô nhập liệu
    billingEmailInput.prop('readonly', true);
  }
});
</script>
<?php
    }
}
add_action('wp_footer', 'custom_billing_email_readonly_script');

// Chỉnh sửa trường billing_country để chỉ có thể xem (read-only)
function custom_billing_country_readonly_script() {
    // Chỉ thêm mã JavaScript nếu ở trang Checkout của WooCommerce
    if (is_checkout()) {
        ?>
<script>
jQuery(document).ready(function($) {
  // Chọn ô nhập liệu theo ID
  var billingCountryInput = $('#billing_country');

  // Kiểm tra xem ô nhập liệu có tồn tại không
  if (billingCountryInput.length) {
    // Đặt thuộc tính readonly cho ô nhập liệu
    billingCountryInput.prop('readonly', true);
  }
});
</script>
<?php
    }
}
add_action('wp_footer', 'custom_billing_country_readonly_script');
// Chỉnh sửa trường billing_first_name để chỉ có thể xem (read-only)
// Chỉnh sửa trường billing_first_name để chỉ có thể xem (read-only)
function custom_billing_firstname_readonly_script() {
    // Chỉ thêm mã JavaScript nếu ở trang Checkout của WooCommerce
    if (is_checkout()) {
        ?>
<script>
jQuery(document).ready(function($) {
  // Chọn ô nhập liệu theo ID
  var billingFirstnameInput = $('#billing_first_name');

  // Kiểm tra xem ô nhập liệu có tồn tại không
  if (billingFirstnameInput.length) {
    // Đặt thuộc tính readonly cho ô nhập liệu
    billingFirstnameInput.prop('readonly', true);
  }
});
</script>
<?php
    }
}
add_action('wp_footer', 'custom_billing_firstname_readonly_script');


// tự động tính toán lại phí vận chuyển khi người dùng nhập input click chuột
add_action('wp_footer', 'custom_billing_email_readonly_script');
// Thêm đoạn mã JavaScript trong trang Checkout
function custom_automatic_shipping_calculation_script() {
// Chỉ thêm mã JavaScript nếu ở trang Checkout của WooCommerce
if (is_checkout()) {
?>
<script>
jQuery(document).ready(function($) {
  // Lắng nghe sự kiện khi người dùng nhập liệu và di chuyển ra khỏi ô nhập liệu
  $('body').on('change', 'input, select', function() {
    // Gọi hàm tính toán lại vận chuyển và tổng tiền của WooCommerce
    $('body').trigger('update_checkout');
  });
});
</script>
<?php
    }
}

//chặn người dùng không cho người dùng request khi checkout

function custom_disable_checkout_fields_script() {
    // Chỉ thêm mã JavaScript nếu ở trang Checkout của WooCommerce
    if (is_checkout()) {
        ?>
<script>
jQuery(document).ready(function($) {
  // Lắng nghe sự kiện khi người dùng ấn nút "Đặt hàng"
  $('form.checkout').on('submit', function() {
    // Ngăn chặn sự kiện mặc định (submit form)
    return false;
  });
});
</script>
<?php
    }
}
add_action('wp_footer', 'custom_disable_checkout_fields_script');