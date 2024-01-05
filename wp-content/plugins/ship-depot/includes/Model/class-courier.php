<?php
defined('ABSPATH') || exit;

if (!class_exists('Ship_Depot_Courier')) {
    class Ship_Depot_Courier extends Ship_Depot_Base_Model
    {
        public int $CourierISN = 0;
        public string $CourierID = "";
        public string $CourierName = "";
        public int  $Status = 0;
        public bool $ApplyCOD = false;
        public string $LogoURL = "";
        public array $ListServices = [];
        public string $CustomerID = "";
        public string $CompanyID = "";
        public string $APIKey = "";
        //For shop setting
        public bool $HasCOD = false;
        public bool $IsUsed = false;
        //For cod failed amount
        public Ship_Depot_COD_Failed $CODFailed;
        //
        public Ship_Depot_Ship_From_Station $ShipFromStation;
        function __construct($object = null)
        {
            $this->CODFailed = new Ship_Depot_COD_Failed();
            $this->ShipFromStation = new Ship_Depot_Ship_From_Station();
            $this->ListServices = [];
            parent::MapData($object, $this);
            Ship_Depot_Logger::wrlog('[Ship_Depot_Courier] this: ' . print_r($this, true));
        }
    }
}
