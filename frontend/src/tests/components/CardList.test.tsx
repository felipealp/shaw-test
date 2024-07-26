import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CardList from '../../components/CardList';

let mockData = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' },
];

describe('CardList Component', () => {
  test('should render without crashing', () => {
    const { container } = render(<CardList data={[]} />);
    expect(container).toBeDefined();
  });

  test('should render correct number of cards', () => {
    render(<CardList data={mockData} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockData.length);
  });

  test('should render when data is different', () => {
    const data = [{ description: 'item 1'}]
    render(<CardList data={data} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(data.length);
  });

  test('should display correct card content', () => {
    render(<CardList data={mockData} />);
    mockData.forEach(item => {
      expect(screen.getAllByText(item.name).length).toBe(2);
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  test('should change page when handleChange is called', () => {
    mockData = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
      { id: 3, name: 'Item 3', description: 'Description 3' },
      { id: 4, name: 'Item 4', description: 'Description 4' },
      { id: 5, name: 'Item 5', description: 'Description 5' },
      { id: 6, name: 'Item 6', description: 'Description 6' },
      { id: 7, name: 'Item 7', description: 'Description 7' },
    ];

    render(<CardList data={mockData} />);
  
    mockData.slice(0, 6).forEach(item => {
      expect(screen.getAllByText(item.name)[0]).toBeInTheDocument();
    });

    const pagination = screen.getByRole('button', { name: /next/i });
    fireEvent.click(pagination);

    mockData.slice(6, 7).forEach(item => {
      expect(screen.getAllByText(item.name)[0]).toBeInTheDocument();
    });
  });
});