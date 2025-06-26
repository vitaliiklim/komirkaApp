import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { ThemeProvider } from '../ThemeContext';

test('shows links', () => {
  render(
    <BrowserRouter>
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    </BrowserRouter>
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('toggles theme', () => {
  render(
    <BrowserRouter>
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    </BrowserRouter>
  );
  const button = screen.getByRole('button', { name: /dark mode/i });
  fireEvent.click(button);
  expect(button).toHaveTextContent(/light mode/i);
});
