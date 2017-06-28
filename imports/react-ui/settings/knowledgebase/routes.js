import React from 'react';
import { mount } from 'react-mounter';
import { MainLayout } from '/imports/react-ui/layout/containers';
import settingsRoute from '../routes';
import { List } from './containers';
import { AddKnowledgeBase } from './components';

const knowledgebase = settingsRoute.group({
  prefix: '/knowledgebase',
});

knowledgebase.route('/list', {
  name: 'settings/knowledgebase/list',

  action(params, queryParams) {
    mount(MainLayout, { content: <List queryParams={queryParams} /> });
  },
});

knowledgebase.route('/add', {
  name: 'settings/knowledgebase/add',

  action() {
    mount(MainLayout, { content: <AddKnowledgeBase /> });
  },
});
