import {
	createRouter,
	createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue';

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Agrohub - Home',
		},
	},
	{
		path: '/weather_forcast',
		name: 'weather_forcast',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/weather_forcast.vue'),
		meta: {
			title: 'Agrohub - weather_forcast',
		},
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/login.vue'),
		meta: {
			title: 'Agrohub - login',
		},
	},
	{
		path: '/my_account',
		name: 'user_profile',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/user_profile.vue'),
		meta: {
			title: 'Agrohub - user_profile',
		},
	},
	{
		path: '/market_price',
		name: 'market_price',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/market_price.vue'),
		meta: {
			title: 'Agrohub - wmarket_prices',
		},
	},
	{
		path: '/disease',
		name: 'disease',
		// route level code-splitting
		// this generates a separate chunk (disease.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "disease" */ '../views/disease.vue'),
		meta: {
			title: 'HubAgro - disease',
		},
	},
	{
		path: '/crops_pests',
		name: 'Crops_Pests',
		// route level code-splitting
		// this generates a separate chunk (disease.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "disease" */
				'../views/pest_crops.vue'
			),
		meta: {
			title: 'HubAgro - Crops and Pests',
		},
	},

	{
		path: '/admin_page',
		name: 'admin_page',
		// route level code-splitting
		// this generates a separate chunk (disease.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "disease" */
				'../views/Admin_Page.vue'
			),
		meta: {
			title: 'HubAgro - Crops and Pests',
		},
	},
	{
		path: '/contact',
		name: 'Contact',
		// route level code-splitting
		// this generates a separate chunk (disease.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "disease" */ '../views/Contact.vue'),
		meta: {
			title: 'Agrohub - Contact',
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

router.beforeEach((to, from, next) => {
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		document.title = previousNearestWithMeta.meta.title;
	}

	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map((el) => el.parentNode.removeChild(el));

	if (!nearestWithMeta) return next();

	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			tag.setAttribute('data-vue-router-controlled', '');

			return tag;
		})
		.forEach((tag) => document.head.appendChild(tag));

	next();
});

export default router;