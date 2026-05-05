const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'fast-glob' );

const blockEntries = glob.sync( 'src/blocks/*/index.js' ).reduce(
	( entries, filePath ) => {
		const blockName = filePath.match( /src\/blocks\/([^/]+)/ )[ 1 ];
		entries[ `blocks/${ blockName }/index` ] = path.resolve(
			process.cwd(),
			filePath
		);
		return entries;
	},
	{}
);

module.exports = {
	...defaultConfig,
	entry: blockEntries,
};
