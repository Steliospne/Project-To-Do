import DOM from './domManipulation';


const testProjects2 = {
    0:  {
        name: 'test project 1',
        description: 'test project 1 description'
    },

    1:  {
        name: 'test project 2',
        description: 'test project 2 description'
    },

    2:  {
        name: 'test project 3',
        description: 'test project 3 description'
    },

    3:  {
        name: 'test project 4',
        description: 'test project 4 description'
    },

    4:  {
        name: 'test project 5',
        description: 'test project 5 description'
    },

    5:  {
        name: 'test project 6',
        description: 'test project 6 description'
    },

    6:  {
        name: 'test project 7',
        description: 'test project 7 description'
    },

    7:  {
        name: 'test project 8',
        description: 'test project 8 description'
    }
}

const myDOM = new DOM(); 
myDOM.populateProjects(testProjects2);