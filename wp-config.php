<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'Cityiscoding' );

/** Database username */
define( 'DB_USER', 'Cityiscoding2402' );

/** Database password */
define( 'DB_PASSWORD', 'Cityiscoding@,.Pho2$@2' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Yv= oB~/!=+kr%eRJw0})T]CMPS!W[[=eyt-6ONuqz;X.<Y}J%sLmcJsE%GOWBx/' );
define( 'SECURE_AUTH_KEY',  '&X|9oEssFJVRvb--ak5Cm8t.]oCt`.gm`f/i:zLf1IE?7:-~W$(Ei/OKy*2&,rmi' );
define( 'LOGGED_IN_KEY',    'ln+[P Eq7CSLR?`XL~s*I>kr,0:YYido?`]cQfJ0Ihl2MD|?bvi-/^Z$&4Rwu8>=' );
define( 'NONCE_KEY',        '[+`nOY([3OjM<K=25M;)PGeG[s+`g{yj!be%1?~DKs0L%W}>-S{W_3y,on6~6D.&' );
define( 'AUTH_SALT',        'NfF[@?7n BfH u/7us.7 Rv`i{1Jd]~c,{.75-sD0I`2W_@,QJl@IE] roxjxx<5' );
define( 'SECURE_AUTH_SALT', 'Y5DXjd12},5wXFm3 6LBod4Y{p)x`^sdIL9`m;]m6.R6l:(B.E yOon_@&=5T*(H' );
define( 'LOGGED_IN_SALT',   'i@r~Ga#pV)K6qDG6eOy}RU,6YqilL8h&)6s>7H?F;`Tj3OdS~Bv.in8SD3/xJ[|j' );
define( 'NONCE_SALT',       'mHxQR<%/`ea(/@>~z+ b;(KmDT6;WFsfb$uIr@yps0N[/yGXN!d[TFw*;s2/v>1C' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
