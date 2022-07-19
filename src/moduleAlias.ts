import ModuleAlias from 'module-alias'

ModuleAlias.addAliases({
  '@config': `${__dirname}/config`,
  '@constants': `${__dirname}/constants`,
  '@controllers': `${__dirname}/controllers`,
  '@models': `${__dirname}/models`,
  '@modules': `${__dirname}/modules`,
  '@repositories': `${__dirname}/repositories`,
  '@routes': `${__dirname}/routes`,
  '@utils': `${__dirname}/utils`,
})
