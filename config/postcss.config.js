module.exports = function({file, options, env}){
	return {
		plugins: {
			'postcss-import': {},
			'postcss-cssnext': {
				browsers: ['last 2 versions', '> 5%']
			},
			// 'postcss-write-svg': {},
			// 'postcss-responsive-type': {},
			// 'postcss-mq-keyframes': env === 'production' ? {} : false,
			// 'css-mqpacker': env === 'production' ? {} : false,
		}
	}
}