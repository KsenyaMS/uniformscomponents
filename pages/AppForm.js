import React from 'react';
import { AutoForm } from 'uniforms-semantic';
import { createSchemaBridge } from '../src';
import { CustomAutoField } from '../src';

export default function AppForm() {
  function onSubmit(data) {
    alert(JSON.stringify(data));
  }
  const schema = {
    title: 'Guest',
    type: 'object',
    properties: {
      firstName: { type: 'string', minLength: 1, maxLength: 10 },
      lastName: { type: 'string', isNotEmpty: true },
      profession: {
        type: 'string',
        options: [
          {
            label: 'Most selectable',
            text: 'Developer',
            value: 'developer'
          },
          {
            label: 'Tester',
            value: 'tester'
          },
          {
            label: 'Product owner',
            value: 'product-owner'
          },
          {
            label: 'Project manager',
            value: 'project-manager'
          },
          {
            label: 'Businessman',
            value: 'businessman'
          }
        ],
        uniforms: {
          search: true
        }
      },
      users: {
        type: 'array',
        title: 'User',
        options: [
          {
            label: 'Tester',
            value: 'tester'
          },
          {
            label: 'Project manager',
            value: 'project-manager'
          },
          {
            label: 'Developer',
            value: 'developer'
          }
        ],
        items: { type: 'string' },
        uniforms: { search: 'true' }
      },
      amount: { type: 'number', uniforms: { decimalScale: 2, thousandSeparator: true } },
      readOnly: { type: 'number', readOnly: true },
      year: {
        type: 'number',
        uniforms: { decimalScale: 0, thousandSeparator: null, format: '####' }
      },
      regDate: { type: 'string', format: 'date' },
      workExperience: {
        description: 'Work experience in years',
        type: 'integer',
        minimum: 0,
        maximum: 100
      },
      phone: {
        type: 'string',
        uniforms: { type: 'phone', format: '+7 ### ###-##-##' },
        minLength: 10,
        maxLength: 10
      },
      email: {
        title: 'E-mail',
        type: 'string',
        format: 'email'
      },
      check: { type: 'boolean' },
      zip: { type: 'string', pattern: '[0-9]{5}' },
      color: { type: 'string', enum: ['red', 'amber', 'green'] }
    },
    required: ['firstName', 'lastName', 'phone']
  };

  const model = {
    profession: 'businessman',
    zip: 123456,
    regDate: '2021-04-15',
    year: 2014
  };

  return (
    <AutoForm
      schema={createSchemaBridge(schema)}
      model={model}
      onSubmit={onSubmit}
      autoField={CustomAutoField}
      showInlineError={true}
    />
  );
}
