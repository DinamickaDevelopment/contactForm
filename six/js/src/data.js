var data = [
[
    {
        title: 'Basic Organization Information',
        subtitle: '',
        placeholders: ['Employer Identification Number (EIN)*',
        'Full legal name of the organization*',
        'Your organization is also known as (AKA)', 
		'www.yourwebsite.org',
        'Please add your organization mission statement here.',
        'Please include your organization history',
        'Please describe your organization\'s work',
        'Add a tagline for your organization',
        'Add organization logo',
        'Number of staff at your organization',
        'Primary contact',
        'Primary contact email',
        'Primary contact phone number',
        'Can an individual or an organization contact you regarding your organization?'
        ],
        all_placeholders: [],
        types: ['i', 'i', 'i', 'i', 't', 't', 't', 'i', 'f', 'i', 'i', 'i', 'i', 'r'],
        style: 'regular',
        f_name: '',
        l_name: '', 
        prompts: ['Enter this 9-digit number using the following format XX-XXXXXXX. EIN is an Employer Identification Number assigned by the IRS to identify a particular organization',
        null, null, 'Your organization website. Required field', '30 words limit', '30 words limit', '50 words limit', null, null, null, 'First name and last name', null, null, ' '],
        values: [],
        patterns: ['nums', 'text', 'text', 'site', '30', '30', '50', 'text', 'file', 'nums', 'name', 'email', 'phone', 'text'],
        required: [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        info: ['format', null, null, null, null, null, null, null, null, null, 'name', null, null, 'radio'],
        formats: ['9'],
        data: [],
        detail: '00',
        view: 0,
        add: 1,
        addable: false

    },
    {
        title: 'Address',
        subtitle: '',
        style: 'drop',
        placeholders: ['Address'],
        drop_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
        all_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
        types: ['i', 'i', 'i', 'i', 'i', 'i', 'r'],
        prompts: [null],
        values: [],
        f_name: '',
        l_name: '',
        formats: ['zip'],
        patterns: ['text', 'nums', 'text', 'text', 'zip', 'text', 'text'],
        required: [1, 0, 0, 0, 0, 0, 0, 0],
        info: ['format'],
        data: [],
        detail: '01',
        view: 0,
        add: 0,
        max: 2,
        addtext: 'If you have more than 1 serving address, please add here.'

    },

        {
            title: 'Address 2',
            subtitle: '',
            style: 'drop',
            placeholders: ['Address'],
            all_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'], 
            drop_placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?'],
            types: ['i', 'i', 'i', 'i', 'i', 'i', 'r'],
            prompts: [null],
            f_name: '',
            l_name: '',
            values: [],
            formats: ['zip'],
            patterns: ['text', 'text', 'text', 'text', 'zip', 'text', 'text', 'text'],
            required: [1, 0, 0, 0, 0, 0, 0, 0],
            info: ['format'],
            data: [],
            detail: '01',
            view: 1,
            add: 1


        },


    {
        title: 'Fiscal Year Information',
        subtitle: '12-month period in which an organization plans to use its funds. This description will appear and be visible to the public.',
        placeholders: [null, null, null, null, null],
        all_placeholders: ['Fiscal year start month*', 'Fiscal year end month*', 'Asset Amount', 'Asset Amount Year', 'Revenue Amount', 'Revenue Amount Year',
        'Income Amount', 'Income Amount Year', 'Year when your organization was founded*', 'Year when your organization was incorporated'],
        prompts: [null],
        values: [],
        required: [],
        style: 'multi',
        f_name: '',
        l_name: '',
        info: [],
        formats: [],
        patterns: [],
        types: ['i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i'],
        multi: [
            {
                placeholders: [
                'Fiscal year start month*', 'Fiscal year end month*'
                ],
                prompts: [],
                patterns: ['text', 'text'],
                formats: ['month', 'month'],
                data: []
            },
                    {
                        placeholders: [
                        'Asset Amount', 'Asset Amount Year'
                        ],
                        prompts: ['Asset amount is an amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization’s asset amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'year'],
                        data: []
                    },
                    {
                        placeholders: ['Revenue Amount', 'Revenue Amount Year'],
                        prompts: ['Revenue amount is an amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization’s revenue amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'year'],
                        data: []
                    },
                    {
                        placeholders: ['Income Amount', 'Income Amount Year'],
                        prompts: ['Income amount is an amount from the most recent 990 return by your organization.', 'Please add the year that corresponded to your organization income amount.'],
                        patterns: ['nums', 'nums'],
                        formats: ['dollar', 'year'],
                        data: []
                    },
                    {
                        placeholders: ['Year when your organization was founded*', 'Year when your organization was incorporated'],
                        prompts: [],
                        patterns: [],
                        patterns: ['nums', 'nums'],
                        formats: ['year', 'year'],
                        data: []
                    }
        ],
        data: [],
        detail: '02',
        view: 0,
        add: 1

    },
            {
                title: 'National Taxonomy of Exempt Entities (NTEE)',
                subtitle: 'Please select service areas that best fit your organization. The National Taxonomy of Exempt Entities (NTEE) describes activities in support of nonprofit organizations.',
                placeholders: ['Select your organization type*', 'Service area of your organization*'],
                all_placeholders: [],
                style: 'regular',
                types: ['d', 'd'],
                values: [[
                    'Nonprofit Organization',
                    'School',
                    'Faith Based organization',
                    'Association'

                ], [
                    'Health',
                    'Education'

                ]],
                prompts: [null, null],
                patterns: [],
                required: [],
                info: ['drop', 'multidrop'],
                drops: [[
                    'Community Health Systems',
                    'Hospital',
                    'Health Treatment Facilities, Primarily Outpatient',
                    'Reproductive Health Care Facilities and Allied Services',
                    'Family Planning Centers',
                    'Health Support Services'

                ], [
                    'Kindergarten, Preschool, Nursery School, Early Admissions',
                    'Primary, Elementary Schools',
                    'Secondary, High School',
                    'Vocational, Technical Schools',
                    'Higher Education Institutions',
                    'Community or Junior Colleges'

                ]],
                data: [],
                detail: '03',
                view: 0,
                add: 1
            },
            {
                title: 'Region(s) that your organization currently serves',
                placeholders: ['Geographic area(s) served by this program*', '5 digit zip code of the regions you serve*'],
                all_placeholders: [], 
                types: ['i', 'i'],
                prompts: [null],
                style: 'regular',
                f_name: '',
                l_name: '',
                values: [],
                patterns: ['text', 'nums'],
                required: [1, 0],
                info: [null, 'format'],
                formats: [null, "zip-multi"],
                data: [],
                detail: '04',
                view: 0,
                add: 1
            },
            {
                title: 'Leadership Information',
                subtitle: 'You can add up to three (3) main leadership profiles to your profile. This information will appear and be visible to the public.',
                placeholders: ['Leadership', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                all_placeholders: [], 
                types: ['i', 'i', 't', 'f', 'i', 'i'], 
                style: 'regular',
                f_name: '',
                l_name: '',
                prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                values: [],
                patterns: ['name', 'text', '50', 'text', 'phone-ext', 'email'],
                required: [0, 0, 0, 0, 0],
                info: ['name', null, null, 'leadership-pic', null, null],
                formats: [null, null, null],
                data: [],
                detail: '05',
                view: 0,
                add: 0,
                max: 2,
                addtext: 'Add leadership profile'
            },
             {
                 title: 'Leadership Information 2',
                 subtitle: '',
                 placeholders: ['Leadership', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                 all_placeholders: [],
                 types: ['i', 'i', 't', 'f', 'i', 'i'],
                 style: 'regular',
                 f_name: '',
                 l_name: '',
                 prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                 null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                 values: [],
                 patterns: ['name', 'text', '50', 'text', 'phone-ext', 'email'],
                 required: [0, 0, 0, 0, 0],
                 info: ['name', null, null, 'leadership-pic', null, null],
                 formats: [null, null, null],
                 data: [],
                 detail: '05',
                 view: 1,
                 add: 0,
                 max: 2,
                 addtext: 'Add leadership profile'
             },
             {
                 title: 'Leadership Information 3',
                 subtitle: '',
                 placeholders: ['Leadership', 'Leadership Job Title', 'Leadership Bio', 'Leadership Picture', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                 all_placeholders: [], 
                 types: ['i', 'i', 't', 'f', 'i', 'i'],
                 style: 'regular',
                 prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                 null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                 values: [],
                 f_name: '',
                 l_name: '',
                 patterns: ['name', 'text', '50', 'text', 'phone-ext', 'email'],
                 required: [0, 0, 0, 0, 0],
                 info: ['name', null, null, 'leadership-pic', null, null],
                 formats: [null, null, null],
                 data: [],
                 detail: '05',
                 view: 1,
                 add: 1
             }
], 
	[
        // Category 2 
	{
	    title: 'Program Information', 
	    subtitle: 'Your organization’s programs and services you are currently working on. The information will be used to show your services and program activities by your organization. This opportunity will appear in your profile and be visible to the public. You can add as many programs as you like.',
	    placeholders: ['Program Name*', 'Service area of your program*', 'Please describe your overall program', 'Please provide funds invested in this program', 
		'Please add types of funds you received for this program', 'Program Length', 'Program Start Date', 'Program End Date'],
	    all_placeholders: [],
	    types: ['i', 'd', 't', 'i', 'i', 'd', 'i', 'i'], 
	    style: 'regular', 
	    prompts: [null, null,
		null, null, 'Funding source can be individual donor, company, grants and so forth.', 'Please include program length for this program. Examples can be 6 months, 1 year or 5 years',
		'Please add your program start date', 'Please add your program end date'],
	    f_name: '', 
	    l_name: '', 
	    patterns: ['text', 'text', 'text', 'nums', 'text', 'text', 'date', 'date'],
	    required: [1,0,0,0,0,0,0,0], 
	    formats: [null, null, null, 'dollar', null, null, null, null], 
	    data: [],
	    values: [null, 
        [
		'Health', 
        'Education'
        ],
        null, null, null,
        [
        '6 Months', 
        '12 Months', 
        '2 Years', 
        '5 Years'
        ],
        null, null
	    ], 
	    drops: [[
            'Community Health Systems',
            'Hospital',
            'Health Treatment Facilities, Primarily Outpatient',
            'Reproductive Health Care Facilities and Allied Services',
            'Family Planning Centers',
            'Health Support Services'

	    ], [
            'Kindergarten, Preschool, Nursery School, Early Admissions',
            'Primary, Elementary Schools',
            'Secondary, High School',
            'Vocational, Technical Schools',
            'Higher Education Institutions',
            'Community or Junior Colleges'

	    ]],
	    detail: '10',
	    info: [null, 'multidrop', 'novalidate', 'format', null, 'drop', 'format', 'format'],
	    view: 0, 
	    add: 1
	}, 
	{
	    title: 'Target Population Served by the Program', 
	    subtitle: '', 
	    placeholders: ['Total Number of Unduplicated Individuals supported by this program', 'Total Number of Unduplicated Families supported by this program',
		'Total number of males supported by this program', 'Total number of females supported by this program', 'Total number of unknown gender supported by this program',
		'Population Served', 'Program Age Group Under 5', ' Program Age Group 5-10', 'Program Age Group 10-15', 'Program Age Group 15-20',
	    'Program Age Group 20-50plus', 'Please add details about the geographic area(s) served by this program.', '5 digit zip code of the regions you serve'],

	    all_placeholders: [],
	    types: ['i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i'],
	    style: 'regular', 
	    prompts: [null, null, null, null, null, 'Please provide specific population group(s) served by the program. What types of individuals are being served with this funding? Examples can be high school students, homeless families, teens, immigrants and so forth.',
		'Please provide the age group of the clients that your program is helping.', 'Please provide the age group of the clients that your program is helping.', 'Please provide the age group of the clients that your program is helping.',
		'Please provide the age group of the clients that your program is helping.', 'Please provide the age group of the clients that your program is helping.',
		null, null],
	    values: [], 
	    f_name: '', 
	    l_name: '', 
	    patterns: ['nums', 'nums', 'nums', 'nums', 'nums', 'text', 'nums', 'nums', 'nums', 'nums', 'nums', 'text', 'nums'],
	    required: [0,0,0,0,0,0,0,0,0,0,0,0,0], 
	    formats: [null, null, null, null, null, null, null, null, null, null, null, null, 'zip-multi'],
	    data: [], 
	    detail: '11',
	    info: [null, null, null, null, null, null, null, null, null, null, null, null, 'format'], 
	    view: 0, 
	    add: 1	
	}, 
	{
	    title: 'Program Activities', 
	    subtitle: 'Please provide different activities used by the program. Examples can be providing tutoring services, credit counseling, food, hygiene and so forth. You can add more program activities.', 
	    placeholders: [null, null],
	    all_placeholders: ['Program Activities 1', ' Program Activities 2', 'Program Output 1', 'Program Output 2'],
	    types: ['i', 'i', 'i', 'i'], 
	    style: 'multi', 
	    prompts: [],
	    values: [],
	    multi: [
            {
                placeholders: [
                'Program Activities 1', ' Program Activities 2'
                ],
                prompts: [null, null],
                patterns: ['text', 'text'],
                formats: ['list', 'list'],
                data: []
            },
            {
                placeholders: [
                'Program Output 1', 'Program Output 2'
                ],
                prompts: ['Products of program activities measured or number of clients served. Examples can be 20 classes taught, 100 educational materials distributed',
                'Products of program activities measured or number of clients served. Examples can be 20 classes taught, 100 educational materials distributed'],
                patterns: ['text', 'text'],
                formats: [null, null],
                data: []
            }
	    ],
	    f_name: '', 
	    l_name: '', 
	    patterns: ['text', 'text', 'text', 'text'], 
	    required: [0,0], 
	    formats: ['list', 'list', null, null], 
	    data: [], 
	    detail: '12',
        info: [null, null], 
	    view: 0, 
	    add: 1	
	}, 
	{
	    title: 'Program Outcomes', 
	    subtitle: 'Please provide details about the program outcomes. Please provide details on how exactly this program helped your main objective of the program. Examples can be decreased high school dropout by 15%. Or, 200 high school students exposed to write resumes.',
	    placeholders: ['Outcome 1', 'Outcome 2', 'Impact Goals - Short Term', 'Impact Goals - Long Term', 'Overall Program Impact', 'What is the status of this program?',
            'Did you meet the program result? ', 'Do you have past program level stats that you want to add to your profile?',
            'Add document', 'Add document'],

	    all_placeholders: [],

	    types: ['i', 'i', 't', 't', 't', 'd', 'r', 'i', 'f', 'f'],
	    style: 'regular', 
	    prompts: ['Please provide details about the program outcomes.', 'Please provide details about the program outcomes.',
            'What is/was your short term, medium and long-term goal. Example can be for short term: to be able to have a resume; medium: to be to be able to go for interview and face the real word; long term: to be to be able to secure a job.',
		'What is/was your short term, medium and long-term goal. Example can be for short term: to be able to have a resume; medium: to be to be able to go for interview and face the real word; long term: to be to be able to secure a job.',
		'Please provide details about what impact this program brings to your participants or those you serve.',
	    null, 'Did you meet the program requirement and make an impact?', 'For example: 200 adults participated in job readiness, computer and job skills training; 500 children received eye exams.',
	    'Do you have a program document that you want to upload?. 5 mb maximum file size.', 'Do you want to upload your recent 990?'],
	    values: [null, null, null, null, null,
	    [
            'Completed', 
            'Ongoing (25%)',
            'Ongoing (50%)',
            'Ongoing (75%)',
            'Not started' 
	    ],
	    null, null, null, null],
		f_name: '', 
		l_name: '', 
		patterns: ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'],
		required: [0,0,0,0,0,0,0,0,0,0], 
		formats: [],
		info: [null, null, 'novalidate', 'novalidate', 'novalidate', 'drop', 'radio', null, '0', '1'],
		data: [], 
		detail: '13', 
		view: 0, 
		add: 1		
	}
	], 
	[
        // Category 3 
	{
		title: '', 
		subtitle: '', 
		placeholders: '', 
		all_placeholders: [], 
		types: [], 
		style: 'regular', 
		prompts: [], 
		values: [], 
		f_name: '', 
		l_name: '', 
		patterns: [], 
		required: [], 
		formats: [], 
		data: [], 
		detail: '20', 
		view: 0, 
		add: 1		
	}, 
	{
		title: '', 
		subtitle: '', 
		placeholders: '', 
		all_placeholders: [], 
		types: [], 
		style: 'regular', 
		prompts: [], 
		values: [], 
		f_name: '', 
		l_name: '', 
		patterns: [], 
		required: [], 
		formats: [], 
		data: [], 
		detail: '21', 
		view: 0, 
		add: 1		
	}, 
	{
		title: '', 
		subtitle: '', 
		placeholders: '', 
		all_placeholders: [], 
		types: [], 
		style: 'regular', 
		prompts: [], 
		values: [], 
		f_name: '', 
		l_name: '', 
		patterns: [], 
		required: [], 
		formats: [], 
		data: [], 
		detail: '22', 
		view: 0, 
		add: 1		
	}, 
	{
		title: '', 
		subtitle: '', 
		placeholders: '', 
		all_placeholders: [], 
		types: [], 
		style: 'regular', 
		prompts: [], 
		values: [], 
		f_name: '', 
		l_name: '', 
		patterns: [], 
		required: [], 
		formats: [], 
		data: [], 
		detail: '23', 
		view: 0, 
		add: 1		
	}
	]
];



function get_data($scope) {
	


            $scope.inputs = JSON.stringify(data[$scope.cat_index])


			
            $scope.refresh_data = function (obj, i) {
                data[$scope.cat_index][i] = obj;
                return data;
            }
            $scope.set_view = function (i) {
                data[0][i+1].view = 0; 
            }

            return data;
}

module.exports = get_data; 
