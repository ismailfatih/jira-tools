/**
 * @desc JavaScript Debug: A simple wrapper for console.?
 *       Allowing Google StackDriver logging to be optionally switched on/off by user.
 */
debug = (function(){
  var aps = Array.prototype.slice,
    con = console,

    // Public object to be returned.
    that = {},

      // switch logger on/off; default: off
    log_enabled = (getVar('debugging')=='true'),

    // Logging methods, in "priority order". Not all console implementations
    log_methods = ['log', 'info', 'warn', 'error', 'time', 'timeEnd'],

  idx = log_methods.length;
  while ( --idx >= 0 ) {
    (function( idx, method ){
      that[ method ] = function() {
        var args = aps.call( arguments, 0 );

        if ( !con || !log_enabled ) { return; }
        con[ method ] ? con[ method ].apply( con, args ) : con.log('[method]:', args );
      };
    })( idx, log_methods[idx] );
  }

  /**
   * @desc Toggle logging on/off
   * @return {this}    Allows chaining
   */
  that.enable = function( enable ) {
    log_enabled = enable ? enable : false;
    return this;
  };

  return that;
})();

function toggleDebugging(formData) {
  setVar('debugging', (formData=='1' ? 'true' : 'false') );
  debug.enable( getVar('debugging')=='true' );
}