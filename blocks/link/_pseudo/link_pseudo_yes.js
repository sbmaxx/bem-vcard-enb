// modules.define('i-bem__dom', function(provide, BEMDOM) {
//
//     BEMDOM.decl({'name': 'link', 'modName': 'pseudo', 'modVal': 'yes'}, {
//
//         _onClick : function(e) {
//
//             e.preventDefault();
//
//             this.hasMod('disabled', 'yes') || this.nextTick(function() {
//                 this.trigger('click');
//             });
//
//         }
//
//     }, {
//
//         live : function() {
//
//             console.log('ololo!!!ssssssss');
//
//             this.__base.apply(this, arguments);
//
//             this.liveBindTo({ modName : 'pseudo', modVal : 'yes' }, 'click', function(e) {
//                 consle.log('onclick');
//                 this._onClick(e);
//             });
//
//         }
//
//     });
//
//     provide(BEMDOM);
//
// });
