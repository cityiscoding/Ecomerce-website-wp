<?php
defined('ABSPATH') || exit;

if (!class_exists('Ship_Depot_Courier_Response')) {
    class Ship_Depot_Courier_Response extends Ship_Depot_Base_Model
    {
        public string $CourierID = "";
        public string $CourierName = "";
        public string $LogoURL = "";
        public array $ListServices = array();
        //For cod failed amount
        public Ship_Depot_COD_Failed $CODFailed;

        function __construct($object = null)
        {
            $this->CODFailed = new Ship_Depot_COD_Failed();
            $this->ListServices = [];
            parent::MapData($object, $this);
            Ship_Depot_Logger::wrlog('[Ship_Depot_Courier_Response] this: ' . print_r($this, true));
        }
    }
}
