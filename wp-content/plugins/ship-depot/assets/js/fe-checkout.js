jQuery(document).ready(function ($)
{
    console.log('fe-checkout injected.');
    loadData();
    function loadData()
    {
        loadBilling();
        loadShipping();
    }

    function loadBilling()
    {
        if ($('#billing_city').length > 0)
        {
            let province_code = $('#billing_city').val();
            let district_code = '';
            let ward_code = '';
            if ($('#billing_district').length > 0)
            {
                district_code = $('#billing_district').val();
            }

            if ($('#billing_ward').length > 0)
            {
                ward_code = $('#billing_ward').val();
            }

            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            if (checkNullorEmpty(district_code))
            {
                //Reset district + ward
                ResetBillingDTandW(province_code);
            } else
            {
                //Check district
                let isDTExisted = false;
                let isWardExisted = false;
                allProvinces.forEach(pro =>
                {
                    if (pro.Code == province_code)
                    {
                        pro.ListDistricts.forEach(dis =>
                        {
                            if (dis.Code == district_code)
                            {
                                isDTExisted = true;
                                if (!checkNullorEmpty(ward_code))
                                {
                                    dis.ListWards.forEach(ward =>
                                    {
                                        if (ward.Code == ward_code)
                                        {
                                            isWardExisted = true;
                                        }
                                    });
                                }
                            }
                        });
                    }
                });

                if (isDTExisted && isWardExisted)
                {
                    //Valid
                } else if (!isDTExisted)
                {
                    //Reset district + ward
                    ResetBillingDTandW(province_code);
                } else if (!isWardExisted)
                {
                    //Reset ward
                    $('#billing_ward').html('<option></option>').removeAttr('disabled');
                    html = '<option value="">' + sd_fe_checkout_params.l10n.select_ward + '</option>';
                    allProvinces.forEach(pro =>
                    {
                        if (pro.Code == province_code)
                        {
                            pro.ListDistricts.forEach(dis =>
                            {
                                if (dis.Code == district_code)
                                {
                                    dis.ListWards.forEach(ward =>
                                    {
                                        html += '<option value="' + ward.Code + '">' + ward.Name + '</option>';
                                    });
                                }
                            });
                        }
                    });
                    $('#billing_ward').html(html).val('');

                    if ($('#ship-to-different-address-checkbox').is(':checked') == false
                        && !checkNullorEmpty($('#billing_ward').val())
                        && !checkNullorEmpty($('#billing_address_1').val()))
                    {
                        $(document.body).trigger('update_checkout');
                    }
                }
            }

        }
    }

    function loadShipping()
    {
        if ($('#shipping_city').length > 0)
        {
            let province_code = $('#shipping_city').val();
            let district_code = '';
            let ward_code = '';
            if ($('#shipping_district').length > 0)
            {
                district_code = $('#shipping_district').val();
            }

            if ($('#shipping_ward').length > 0)
            {
                ward_code = $('#shipping_ward').val();
            }

            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            if (checkNullorEmpty(district_code))
            {
                //Reset district + ward
                ResetShippingDTandW(province_code);
            } else
            {
                //Check district
                let isDTExisted = false;
                let isWardExisted = false;
                allProvinces.forEach(pro =>
                {
                    if (pro.Code == province_code)
                    {
                        pro.ListDistricts.forEach(dis =>
                        {
                            if (dis.Code == district_code)
                            {
                                isDTExisted = true;
                                if (!checkNullorEmpty(ward_code))
                                {
                                    dis.ListWards.forEach(ward =>
                                    {
                                        if (ward.Code == ward_code)
                                        {
                                            isWardExisted = true;
                                        }
                                    });
                                }
                            }
                        });
                    }
                });

                if (isDTExisted && isWardExisted)
                {
                    //Valid
                } else if (!isDTExisted)
                {
                    //Reset district + ward
                    ResetShippingDTandW(province_code);
                } else if (!isWardExisted)
                {
                    //Reset ward
                    $('#shipping_ward').html('<option></option>').removeAttr('disabled');
                    html = '<option value="">' + sd_fe_checkout_params.l10n.select_ward + '</option>';
                    allProvinces.forEach(pro =>
                    {
                        if (pro.Code == province_code)
                        {
                            pro.ListDistricts.forEach(dis =>
                            {
                                if (dis.Code == district_code)
                                {
                                    dis.ListWards.forEach(ward =>
                                    {
                                        html += '<option value="' + ward.Code + '">' + ward.Name + '</option>';
                                    });
                                }
                            });
                        }
                    });
                    $('#shipping_ward').html(html).val('');

                    if ($('#ship-to-different-address-checkbox').is(':checked') == false
                        && !checkNullorEmpty($('#shipping_ward').val())
                        && !checkNullorEmpty($('#shipping_address_1').val()))
                    {
                        $(document.body).trigger('update_checkout');
                    }
                }
            }

        }
    }
    //Reset district and ward
    function ResetBillingDTandW(province_code)
    {
        let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
        $('#billing_ward').html('<option></option>').attr('disabled', 'disabled');
        html = '<option value="">' + sd_fe_checkout_params.l10n.select_district + '</option>';
        allProvinces.forEach(pro =>
        {
            if (pro.Code == province_code)
            {
                pro.ListDistricts.forEach(dis =>
                {
                    html += '<option value="' + dis.Code + '">' + dis.Name + '</option>';
                });
            }
        });
        $('#billing_district').html(html);

        if ($('#ship-to-different-address-checkbox').is(':checked') == false
            && !checkNullorEmpty($('#billing_district').val())
            && !checkNullorEmpty($('#billing_ward').val())
            && !checkNullorEmpty($('#billing_address_1').val()))
        {
            $(document.body).trigger('update_checkout');
        }
    }

    //Reset district and ward
    function ResetShippingDTandW(province_code)
    {
        let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
        $('#shipping_ward').html('<option></option>').attr('disabled', 'disabled');
        html = '<option value="">' + sd_fe_checkout_params.l10n.select_district + '</option>';
        allProvinces.forEach(pro =>
        {
            if (pro.Code == province_code)
            {
                pro.ListDistricts.forEach(dis =>
                {
                    html += '<option value="' + dis.Code + '">' + dis.Name + '</option>';
                });
            }
        });
        $('#shipping_district').html(html);

        if ($('#ship-to-different-address-checkbox').is(':checked') == false
            && !checkNullorEmpty($('#shipping_district').val())
            && !checkNullorEmpty($('#shipping_ward').val())
            && !checkNullorEmpty($('#shipping_address_1').val()))
        {
            $(document.body).trigger('update_checkout');
        }
    }

    if ($('#billing_city').length > 0)
    {
        $('#billing_city').change(function ()
        {
            console.log('billing_city change');
            let province_code = jQuery(this).val();
            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            $('#billing_ward').html('<option></option>').attr('disabled', 'disabled');
            html = '<option value="">' + sd_fe_checkout_params.l10n.select_district + '</option>';
            allProvinces.forEach(pro =>
            {
                if (pro.Code == province_code)
                {
                    pro.ListDistricts.forEach(dis =>
                    {
                        html += '<option value="' + dis.Code + '">' + dis.Name + '</option>';
                    });
                }
            });
            $('#billing_district').html(html);
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#billing_district').length > 0)
    {
        $('#billing_district').change(function ()
        {
            console.log('billing_district change');
            let province_select = $('#billing_city');
            let province_code = province_select.val();
            let district_code = jQuery(this).val();
            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            $('#billing_ward').html('<option></option>').removeAttr('disabled');
            html = '<option value="">' + sd_fe_checkout_params.l10n.select_ward + '</option>';
            allProvinces.forEach(pro =>
            {
                if (pro.Code == province_code)
                {
                    pro.ListDistricts.forEach(dis =>
                    {
                        if (dis.Code == district_code)
                        {
                            dis.ListWards.forEach(ward =>
                            {
                                html += '<option value="' + ward.Code + '">' + ward.Name + '</option>';
                            });
                        }
                    });
                }
            });
            $('#billing_ward').html(html).val('');
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#billing_ward').length > 0)
    {
        $('#billing_ward').change(function ()
        {
            console.log('billing_ward change');
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#shipping_city').length > 0)
    {
        $('#shipping_city').change(function ()
        {
            console.log('shipping_city change');
            let province_code = jQuery(this).val();
            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            $('#shipping_ward').html('<option></option>').attr('disabled', 'disabled');
            html = '<option value="">' + sd_fe_checkout_params.l10n.select_district + '</option>';
            allProvinces.forEach(pro =>
            {
                if (pro.Code == province_code)
                {
                    pro.ListDistricts.forEach(dis =>
                    {
                        html += '<option value="' + dis.Code + '">' + dis.Name + '</option>';
                    });
                }
            });
            $('#shipping_district').html(html);
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#shipping_district').length > 0)
    {
        $('#shipping_district').change(function ()
        {
            console.log('shipping_district change');
            let province_select = $('#shipping_city');
            let province_code = province_select.val();
            let district_code = jQuery(this).val();
            let allProvinces = JSON.parse(sd_fe_checkout_params.all_provinces);
            $('#shipping_ward').html('<option></option>').removeAttr('disabled');
            html = '<option value="">' + sd_fe_checkout_params.l10n.select_ward + '</option>';
            allProvinces.forEach(pro =>
            {
                if (pro.Code == province_code)
                {
                    pro.ListDistricts.forEach(dis =>
                    {
                        if (dis.Code == district_code)
                        {
                            dis.ListWards.forEach(ward =>
                            {
                                html += '<option value="' + ward.Code + '">' + ward.Name + '</option>';
                            });
                        }
                    });
                }
            });
            $('#shipping_ward').html(html).val('');
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#shipping_ward').length > 0)
    {
        $('#shipping_ward').change(function ()
        {
            console.log('shipping_ward change');
            $(document.body).trigger('update_checkout');
        });
    }

    if ($('#ship-to-different-address-checkbox').length > 0)
    {
        $('#ship-to-different-address-checkbox').change(function (event)
        {

        });
    }

    if ($('form[name=checkout]').length > 0)
    {
        $('form[name=checkout]').on('change', 'input[type=radio][class=radio_shipping_fee]', function ()
        {
            $(document.body).trigger('update_checkout');
        });

        $('form[name=checkout]').on('change', 'input[type=radio][name=payment_method]', function ()
        {
            $(document.body).trigger('update_checkout');
        });

        $('form[name=checkout]').on('click', '#place_order', function (event)
        {
            console.log('btn place order click');
            event.preventDefault();
            //Logic GHTK
            let idSelectedServ = $('input[name=shipdepot_shipping_selected]:checked').val();
            if (idSelectedServ != '')
            {
                let selectedServ = $('#' + idSelectedServ);
                if (selectedServ.length > 0)
                {
                    let jsonServ = selectedServ.val().replace(new RegExp(`'`, 'g'), `\"`);
                    let selectedCour = JSON.parse(jsonServ).CourierID;
                    if (selectedCour == sd_fe_checkout_params.l10n.ghtk_courier_code)
                    {
                        let type = $('#ship-to-different-address-checkbox').is(':checked') ? 'shipping' : 'billing';
                        let cusProvince = '';
                        let cusProvinceText = '';
                        let cusDist = '';
                        let cusWard = '';
                        let cusAddr = '';
                        if (type == 'billing')
                        {
                            cusProvince = $('#billing_city').val();
                            cusProvinceText = $('#billing_city option:selected').text();
                            cusDist = $('#billing_district').val();
                            cusWard = $('#billing_ward').val();
                            cusAddr = $('#billing_address_1').val();
                        } else if (type == 'shipping')
                        {
                            cusProvince = $('#shipping_city').val();
                            cusProvinceText = $('#shipping_city option:selected').text();
                            cusDist = $('#shipping_district').val();
                            cusWard = $('#shipping_ward').val();
                            cusAddr = $('#shipping_address_1').val();
                        }
                        let strProNeedHamlet = sd_fe_checkout_params.l10n.ghtk_province_spc;
                        const provinceNeedHamlet = strProNeedHamlet.split(",");
                        if (provinceNeedHamlet.includes(cusProvince))
                        {
                            let dataInput = {
                                selected_courier: selectedCour,
                                city: cusProvince,
                                district: cusDist,
                                ward: cusWard,
                                address: cusAddr
                            }

                            jQuery.ajax({
                                url: sd_fe_checkout_params.ajax.ship_depot_host_api + '/Shipping/GetHamlet',
                                headers: {
                                    'ShopAPIKey': sd_fe_checkout_params.l10n.sd_api_key
                                },
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(dataInput),
                                type: 'POST',
                                success: function (response)
                                {
                                    if (response.Code >= 0)
                                    {
                                        $.each(response.Data, function (index, item)
                                        {
                                            console.log(item);
                                            $("#slGHTKHamlet").append(new Option(item, item));
                                        });
                                        $('#myModal').show();
                                    } else
                                    {
                                        alert('Lấy danh sách địa chỉ cấp 4 với tỉnh ' + cusProvinceText + ' thất bại. Vui lòng thử lại sau.');
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log('The following error occured: ' + textStatus, errorThrown);
                                    alert('Lấy danh sách địa chỉ cấp 4 với tỉnh ' + cusProvinceText + ' thất bại. Vui lòng thử lại sau.');
                                }

                            });
                            return;
                        }
                    }
                }
            }
            $('form[name="checkout"]').submit();
        });

        if ($('#myModal').length > 0)
        {
            if ($('#btnModalOK').length > 0)
            {
                $('form[name=checkout]').on('click', '#btnModalOK', function ()
                {
                    $("#ghtkHamlet").val($("#slGHTKHamlet").val());
                    $('#myModal').hide();
                    $('form[name="checkout"]').submit();
                });
            }
        }

        $('form[name=checkout]').on('change', 'textarea[name=shipdepot_shipping_notes]', function ()
        {
            console.log('Notes changed to ', this.value);
            $.ajax({
                url: sd_fe_checkout_params.ajax.url, //Đường dẫn chứa hàm xử lý dữ liệu. Mặc định của WP như vậy
                type: "post",
                dataType: 'json',
                context: this,
                data: {
                    action: "save_notes_session",
                    notes: this.value
                },
                success: function (response)
                {
                    console.log('Save cookies notes success');
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    console.log('Save cookies notes error. The following error occured: ' + textStatus, errorThrown);
                }

            });
        });
    }


});

function checkNullorEmpty(value)
{
    if (value == null || value == '' || value.replace(/^\s+|\s+$/gm, '') == '')
    {
        return true;
    }
    return false;
}