import React from "react";

import { Pagination } from "react-bootstrap";

type Props = {
  step: number;
  numbersShown: number;
  currentPage: number;
  totalPages: number;
  pageChanged(page: number, step: number): any;
};

const TablePagination: React.FC<Props> = ({
  step,
  numbersShown,
  currentPage,
  totalPages,
  pageChanged,
}) => {
  const numbers = Array.from(
    { length: numbersShown },
    (_, index) => (step - 1) * 10 + (index + 1)
  );
  const items = numbers.map((n) => {
    return (
      <Pagination.Item active={n == currentPage} onClick={() => goTo(n)}>
        {n}
      </Pagination.Item>
    );
  });

  const goToFirst = () => {
    if (currentPage > 1) {
      pageChanged(1, 1);
    }
  };

  const goToLast = () => {
    if (currentPage < totalPages) {
      pageChanged(totalPages, maxStep());
    }
  };

  const stepBackward = () => {
    if (step > 1) {
      pageChanged((step - 2) * 10 + 1, step - 1);
    }
  };

  const stepFoward = () => {
    if (step < maxStep()) {
      pageChanged((step + 0) * 10 + 1, step + 1);
    }
  };

  const goTo = (n: number) => {
    pageChanged(n, step);
  };

  const maxStep = (): number => {
    return Math.ceil(totalPages / numbersShown);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => goToFirst()} />
      <Pagination.Prev onClick={() => stepBackward()} />
      {items}
      <Pagination.Next onClick={() => stepFoward()} />
      <Pagination.Last onClick={() => goToLast()} />
    </Pagination>
  );
};

export default TablePagination;
