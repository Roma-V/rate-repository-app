import React from 'react';
import { render } from '@testing-library/react-native';

import repositories from '../../__mocks__/testRepositoriesData';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { convertLargeNumbers } from '../../components/RepositoryItem'

const textProperties = Object.keys(
    repositories.edges[0].node
    ).slice(1, 4);
const buttonProperties = Object.keys(
    repositories.edges[0].node
    ).slice(4, 6);

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            // Add your test code here
            const { debug, getAllByTestId } = render(
                <RepositoryListContainer repositories={repositories} />
            );

            // debug();

            for (prop of textProperties) {
                const elements = getAllByTestId(prop)
                expect(elements.length).toBe(repositories.edges.length);
                elements.forEach((element, index) => {
                    expect(element).toHaveTextContent(
                        repositories.edges[index].node[prop]
                        )
                });
            }
            for (prop of buttonProperties) {
                const elements = getAllByTestId(prop)
                expect(elements.length).toBe(repositories.edges.length);
                elements.forEach((element, index) => {
                    expect(element).toHaveTextContent(
                        convertLargeNumbers(
                            repositories.edges[index].node[prop]
                            )
                        )
                });
            }
        });
    });
  });