
const LOCALES = require('../../../locales.json');

export enum TextDirection {
	LTR,
	RTL
}

export const CONFIG = {
	SPECIAL: {
		ID: '2d664feb111ebc50c56165966d077f8e'
	},

	REF_PARAMS: [
		'id',
		'refid',
		'click_id',
		'source_id',
		'banner_id',
		'keywords',
		'land',
		'campaign_id',
		'adset_id',
		'tr',
		'tr2',
		'uniq',
		'page',
		'bonusCode',
		'referer',
		'ctime'
	],

	BANNERS: {
		TIME_TO_END_100_PERCENT: 2400
	},

	COMMON: {
		DRAWER_ANIMATION_TIME: 400,
		TABS_NAV_HEIGHT: 55,
		LOGOUT_URL: 'https://{subdomain}expertoption.com',
		BANNER_100_PERCENT_TIMEOUT: 2400,
		WAKE_UP_THRESHOLD: 2000
	},

	UI: {
		SELECT_DROPDOWN_MAX_HEIGHT_ITEMS: 5
	},

	WEB_SOCKET: {
		ADDRESS: window['pushAddress'] || 'wss://fr24g1.expertoption.com',
		PUSH_TOKEN: window['pushToken'] || null,
		BINARY: true,
		DEBUG: true,
		COMMON_NAMESPACE: '_common',
		RECONNECT_INTERVAL: 3000,
		PING_PONG_INTERVAL: 5000,
		CONNECTION_DELAY_THRESHOLD: 6000,
		RECONNECT_MAXIMUM_ATTEMPTS: Infinity,
		API_VERSION: 4,
		LOG_RESTRICT_ACTIONS: [
			// 'ping',
			// 'pong'
		],
		LOG_SHOW_DATA: true
	},

	STORAGE: {
		PREFIX: 'EO',
		COOKIES: {
			OPTIONS: {
				domain: '.expertoption.com',
				path: '/',
				expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
			}
		}
	},

	LOADING: {
		LOADING_TRAY_ITEM_TIMEOUT: 60000
	},

	LOCALE: {
		MESSAGES_URL_TEMPLATE: '/translations/{locale}.json',
		DEFAULT_LOCALE: 'en-GB',
		LOCALES: LOCALES
	},

	DEALS: {
		PER_PAGE: 10,
		MAIN_LIMIT: 100
	},

	TRADE: {
		START_DEAL_AMOUNT: {
			DEMO: 50,
			REAL: 1
		},
		SOCIAL_WATCH_DEFAULT: true,
		DEFAULT_REFUND: 0,
		CHART_SIZES: {
			FULL: 100,
			HALF: 50,
			THIRD: 35,
			TWO_THIRD: 65
		},
		SOCIAL_FINISHED_DEALS_LIFETIME: 120000,
		SOCIAL_DEALS_FLUSH_LIFETIME: 360000,
		MAXIMUM_ASSET_SUBSCRIPTIONS: 2,
		MAXIMUM_CHARTS: 2,
		CHART_LOADING_ANIMATION_DURATION: 500,
		INDICATORS: {
			COLORS: {
				GREEN: 'rgba(134,218,14,1)',
				CYAN: 'rgba(0,255,204,1.00)',
				YELLOW: 'rgba(241,196,15,1)',
				ORANGE: 'rgba(230,126,34,1)',
				RED: 'rgba(255,0,0,1)',
				BROWN: 'rgba(211,84,0,1)',
				BLUE: 'rgba(34,86,255,1.00)',
				PURPLE: 'rgba(255,0,255,1)'
			}
		},
		RIGHT_PANEL_SHOW_WIDTH: 1440
	},

	ASSETS: {
		DEFAULT_GROUP: 'currencies',
		DEFAULT_TYPE: 'short',
		MAX_EXPIRATION_TIME_FOR_SHORT_TYPE: 60,
		FADED_PROFIT: 60
	},

	USER: {
		FACEBOOK_AUTH: {
			WINDOW_WIDTH: 850,
			WINDOW_HEIGHT: 650,
			WINDOW_TITLE: 'ExpertOption – Facebook Login',
			URL: 'https://graph.facebook.com/oauth/authorize?scope=email&state=fb&redirect_uri=https://auth.expertoption.com/facebook_auth/&response_type=code&client_id=180862378929370',
			URL_DESKTOP: 'https://graph.facebook.com/oauth/authorize?scope=email&state=fb&redirect_uri=https://auth.expertoption.com/facebook_auth/&response_type=code&client_id=180862378929370&isDesktop=1'
		},
		GOOGLE_AUTH: {
			WINDOW_WIDTH: 850,
			WINDOW_HEIGHT: 650,
			WINDOW_TITLE: 'ExpertOption – Google Login',
			URL: 'https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=https%3A%2F%2Fauth.expertoption.com%2Fgoogle%2Fauth&response_type=code&client_id=343922449785-tpa1cra07nd3fndrsdtc8hig22v8kbof.apps.googleusercontent.com',
			URL_DESKTOP: 'https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=https%3A%2F%2Fauth.expertoption.com%2Fgoogle%2Fauth&response_type=code&client_id=343922449785-tpa1cra07nd3fndrsdtc8hig22v8kbof.apps.googleusercontent.com'
		},
		PASSWORD_RESET:"https://en.expertoption.com/api/password-reset",
		AVATAR_MAX_SIZE: 5350400, // 5MB
		AVATAR_DIMENSIONS: {
			W: 256,
			H: 256
		},
		AVATAR_EXTENSIONS: [
			'jpg',
			'jpeg',
			'png'
		],
		EDITABLE_PROFILE_FIELDS: [
			'lang',
			'email',
			'surname',
			'name',
			'no_news',
			'city',
			'zip',
			'address',
			'birthdate',
			'gender'
		],
		DEFAULT_SETTINGS: {
			soundEnabled: true,
			mouseTarget: true,
			nativeNotifications: true,
			dealConfirmDialog: true,
			resultDialog: true
		},
		VERIFICATION: {
			uploadUrl: 'https://billing.expertoption.com/web/verification/upload/',
			confirmationRulesPage: '/info/terms',
			confirmationRulesPageDesktop: 'https://expertoption.com/about/terms',
			maxFileSize: 50 * 1024 * 1024 // 50Mb
		}
	},

	ANALYTICS: {
		TECHNICAL_UPDATE_INTERVAL: 20000,
		ASSET_LIMIT: 15,
		ASSET_SCHEDULE_URL: 'https://yj6g3.expertoption.com/web/get_asset_schedule.json',
		MAP_DATA_URL: 'https://expertoption.com/platform/assets?json=1',
		ASSET_SCHEDULE_REDRAW_INTERVAL: 1000
	},

	NOTIFICATIONS: {
		ICON: '/img/logos/logo-short-blue.png',
		LIFETIME: 6000,
		REMOVING_DURATION: 500,
		NOTIFICATION_UNIQUE_ID_PREFIX: 'notification'
	},

	HISTORY_CHART: {
		leftShadeWidth: 60,
		bg: '#1C2334',
		gridLineColor: '#4F6376',
		gridLineAlpha: 0.25,
		gridStepSize: 50,
		graphOffsetY: 90,
		graphMarginRight: 30,
		expLineAlpha: 0.75,
		expLineFont: '12px Open Sans',
		graphLineColor: '#63B7FB',
		graphLineWidth: 2,
		graphLineAlpha: 1,
		graphAreaGradientFrom: '#2586D3',
		graphAreaGradientTo: '#154D7A',
		graphAreaAlpha: 0.45,
		expTimeLineColor: '#F5CD3F',
		putColor: '#FF3C6D',
		callColor: '#1CC4B7'
	},

	BILLING: {
		MAXIMUM_AMOUNT: 99999999,
		WITHDRAWAL_FAQ_URL: 'https://expertoption.com/api/get-withdrawal-faq?',
		DEPOSIT: {
			sngPaymentMethods: [2, 16],
			phoneDefaultCountrySNG: 'RU',
			phoneDefaultCountryGlobal: 'CN',
			billingSelectorIds: [
				1, 2, 3, 6, 7, 11, 15, 16, 18, 19, 21, 22, 23, 24, 26, 31, 32, 33, 34, 35, 36
			],
			handleFasapayUrl: 'https://billing.expertoption.com/web/handle_fasapay/',
			dataUrl: 'https://billing.expertoption.com/web/mobile_deposit.json/',
			proceedUrl1: 'https://billing.expertoption.com/goto_billing.php?',
			proceedUrl2: 'https://billing.expertoption.com/web/goto_billing/?',
			pricingDataUrl: 'https://expertoption.com/pricing?json=1',
			paymentMethodImagePathPrefix: 'https://static.expertoption.com/payment-methods-icons/',
			defaultCurrencyId: 3,
			defaultStatusName: 'gold',
			bonusCodeForFirstDeposit: 'SPECIAL_OFFER_FIRST_DEPOSIT',
			bonusEnabled: true
		}

	},
	INFO: {
		FEEDBACK_FORM_URL: 'https://expertoption.com/about/contacts/send?json=1',
		CONTACTS_DATA_URL: '/data/contacts.json',
		EDUCATION_DATA_URL: 'https://expertoption.com/education?json=1',
		FAQ_DATA_URL: 'https://expertoption.com/platform/faq?json=1',
		GLOSSARY_DATA_URL: 'https://expertoption.com/education/glossary?json=1',
		ABOUT_PAGE_URL: 'https://expertoption.com/about?json=1'
	},

	TERMS: {
		TERMS: {url: 'https://expertoption.com/about/terms?json=1', title: 'ASIDE_MENU.TERMS'},
		TERMS_PAYMENT: {url: 'https://expertoption.com/about/terms/payment?json=1', title: 'ASIDE_MENU.PAYMENT_POLICY'},
		TERMS_RETURN_REFUND: {
			url: 'https://expertoption.com/about/terms/return?json=1',
			title: 'ASIDE_MENU.RETURN_POLICY'
		},
		TERMS_PRIVACY: {url: 'https://expertoption.com/about/terms/privacy?json=1', title: 'ASIDE_MENU.PRIVACY_POLICY'},
		TERMS_BONUS: {url: 'https://expertoption.com/about/terms/bonus?json=1', title: 'ASIDE_MENU.BONUS_POLICY'},
		TERMS_AML: {url: 'https://expertoption.com/about/terms/aml?json=1', title: 'ASIDE_MENU.AML_POLICY'},
		TERMS_ONE_CLICK: {url: 'https://expertoption.com/about/terms/one-click?json=1', title: 'ASIDE_MENU.ONE_CLICK_TERMS'}
	},

	EDUCATION: {
		sections: [
			{
				title: "GLOSSARY",
				dir: "glossary",
				name: "glossary",
				image: "/images/education/glossary.jpg",
				documents: []
			},
			{
				name: "technical-analysis",
				dir: "technical-analysis",
				title: "TECHNICAL_ANALYSIS",
				image: "/images/education/technical_analysis.jpg",
				documents: [
					{
						name: "introduction",
						dir: "introduction",
						title: "INTRODUCTION",
						image: "/images/book.svg"
					},
					{
						name: "trend-line-support-resistance",
						dir: "trend-line-support-resistance",
						title: "TREND_LINE_SUPPORT_RESISTANCE",
						image: "/images/book.svg"
					},
					{
						name: "moving-averages",
						dir: "moving-averages",
						title: "MOVING_AVERAGES",
						image: "/images/book.svg"
					},
					{
						name: "alligator",
						dir: "alligator",
						title: "ALLIGATOR",
						image: "/images/book.svg"
					},
					{
						name: "bollinger-bands",
						dir: "bollinger-bands",
						title: "BOLLINGER_BANDS",
						image: "/images/book.svg"
					}
				]
			},
			{
				name: "graphical-analysis",
				dir: "graphical-analysis",
				title: "GRAPHICAL_ANALYSIS",
				image: "/images/education/graphical_analysis.jpg",
				documents: [
					{
						name: "candlestick-analysis",
						dir: "candlestick-analysis",
						title: "CANDLESTICK_ANALYSIS",
						image: "/images/book.svg"
					},
					{
						name: "graphical-analysis",
						dir: "graphical-analysis",
						title: "GRAPHICAL_ANALYSIS",
						image: "/images/book.svg"
					},
					{
						name: "trend-continuation",
						dir: "trend-continuation",
						title: "TREND_CONTINUATION",
						image: "/images/book.svg"
					},
					{
						name: "figures-trend-reversal",
						dir: "figures-trend_reversal",
						title: "FIGURES_TREND_REVERSAL",
						image: "/images/book.svg"
					},
					{
						name: "fibonacci-and-elliott-wave",
						dir: "fibonacci-and_elliott_wave",
						title: "FIBONACCI_AND_ELLIOTT_WAVE",
						image: "/images/book.svg"
					}
				]
			},
			{
				name: "fundamental-analysis",
				dir: "fundamental-analysis",
				title: "FUNDAMENTAL_ANALYSIS",
				image: "/images/education/fundamental_analysis.jpg",
				documents: [
					{
						name: "introduction",
						dir: "fundamental-analysis",
						title: "INTRODUCTION",
						image: "/images/book.svg"
					},
					{
						name: "basic-fundamental-indexes",
						dir: "basic-fundamental-indexes",
						title: "BASIC_FUNDAMENTAL_INDEXES",
						image: "/images/book.svg"
					}
				],
				count: 0,
				total: 2
			},
			{
				name: "psychology-of-trading",
				dir: "psychology-of-trading",
				title: "PSYCHOLOGY_OF_TRADING",
				image: "/images/education/psychology_of_trading.jpg",
				documents: [
					{
						name: "psychology-of-trading",
						dir: "psychology-of-trading",
						title: "INTRODUCTION",
						image: "/images/book.svg"
					},
					{
						name: "psychology-of-the-market-crowd",
						dir: "psychology-of-the-market-crowd",
						title: "PSYCHOLOGY_OF_THE_MARKET_CROWD",
						image: "/images/book.svg"
					},
					{
						name: "individual-psychology-trade",
						dir: "individual-psychology-trade",
						title: "INDIVIDUAL_PSYCHOLOGY_TRADE",
						image: "/images/book.svg"
					},
					{
						name: "successful-traders",
						dir: "successful-traders",
						title: "SUCCESSFUL_TRADERS",
						image: "/images/book.svg"
					}
				]
			},
			{
				name: "trading-strategies",
				dir: "trading-strategies",
				title: "TRADING_STRATEGIES",
				image: "/images/education/trading_strategies.jpg",
				documents: [
					{
						name: "introduction",
						dir: "introduction",
						title: "INTRODUCTION",
						image: "/images/book.svg"
					},
					{
						name: "strategy-candle-absorption",
						dir: "strategy-candle-absorption",
						title: "STRATEGY_CANDLE_ABSORPTION",
						image: "/images/book.svg"
					},
					{
						name: "strategy-to-squat-candles",
						dir: "strategy-to-squat-candles",
						title: "STRATEGY_TO_SQUAT_CANDLES",
						image: "/images/book.svg"
					},
					{
						name: "strategy-tweezers",
						dir: "strategy-tweezers",
						title: "STRATEGY_TWEEZERS",
						image: "/images/book.svg"
					},
					{
						name: "strategy-three-methods",
						dir: "strategy-three-methods",
						title: "STRATEGY_THREE_METHODS",
						image: "/images/book.svg"
					},
					{
						name: "strategy-breakdown-level",
						dir: "strategy-breakdown-level",
						title: "STRATEGY_BREAKDOWN_LEVEL",
						image: "/images/book.svg"
					},
					{
						name: "strategy-on-the-level-of-rebound",
						dir: "strategy-on-the-level-of-rebound",
						title: "STRATEGY_ON_THE_LEVEL_OF_REBOUND",
						image: "/images/book.svg"
					},
					{
						name: "strategy-moving-average",
						dir: "strategy-moving-average",
						title: "STRATEGY_MOVING_AVERAGE",
						image: "/images/book.svg"
					},
					{
						name: "strategy-waves-bollinger",
						dir: "strategy-waves-bollinger",
						title: "STRATEGY_WAVES_BOLLINGER",
						image: "/images/book.svg"
					},
					{
						name: "strategy-alligator",
						dir: "strategy-alligator",
						title: "STRATEGY_ALLIGATOR",
						image: "/images/book.svg"
					}
				]
			}
		]
	},

	ENUMS: {
		PROFILE: {
			GENDER: {
				MALE: 0,
				FEMALE: 1
			},

			USER_IS_DEMO: {
				NO: 0,
				YES: 1
			},

			CURRENCIES: {
				USD_DEMO: 0,
				EUR: 1, // 1
				RUB: 2, // 50
				USD: 3, // 1
				THB: 4, // 30
				CNH: 5, // 6
				IDR: 6, // 10000
				KRW: 7 // 1000
			},

			EMAIL_CONFIRMED: {
				NO: 0,
				YES: 1
			},

			ID_CONFIRMED: {
				NO: 0,
				YES: 1
			},

			NO_NEWS: {
				NO: 0,
				YES: 1
			}
		}
	}
};